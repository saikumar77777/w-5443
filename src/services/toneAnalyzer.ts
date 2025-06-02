import { enhanceMessageWithAI } from './openai';

export interface ToneAnalysis {
  tone: 'aggressive' | 'neutral' | 'weak' | 'confusing' | 'clear';
  impact: 'high' | 'medium' | 'low';
  suggestions?: string;
  score: number; // 1-10 scale
}

/**
 * Analyzes the tone and impact of a message
 * @param message The message to analyze
 * @param channelMessages Context messages from the channel
 * @param channelName Name of the channel for context
 * @returns A ToneAnalysis object with tone, impact, suggestions, and score
 */
export const analyzeTone = async (
  message: string,
  channelMessages: any[],
  channelName: string
): Promise<ToneAnalysis> => {
  // Don't analyze empty messages
  if (!message || message.trim() === '') {
    return {
      tone: 'neutral',
      impact: 'low',
      suggestions: 'Message is empty.',
      score: 3
    };
  }

  try {
    // Validate input parameters
    if (!message || typeof message !== 'string') {
      console.error('Invalid message provided to analyzeTone:', message);
      return {
        tone: 'neutral',
        impact: 'medium',
        suggestions: 'Could not analyze tone due to invalid input.',
        score: 5
      };
    }
    
    // Ensure channelMessages is an array
    if (!Array.isArray(channelMessages)) {
      console.error('Invalid channelMessages provided to analyzeTone:', channelMessages);
      channelMessages = [];
    }
    
    // Get recent context messages (last 3) with validation
    const recentMessages = channelMessages
      .slice(-3)
      .filter(msg => msg && typeof msg === 'object' && msg.username && msg.content)
      .map(msg => `${msg.username || 'User'}: ${msg.content || ''}`)
      .join('\n');

    // Create a prompt for the OpenAI API to analyze the tone
    const prompt = `
You are an AI assistant that analyzes the tone and impact of messages in a professional chat environment.

Channel context: ${channelName}
Recent conversation:
${recentMessages}

Message to analyze: "${message}"

Be very critical and precise in your analysis. Pay close attention to language, word choice, punctuation, and context.

Analyze the tone of this message and categorize it as ONE of the following:
- aggressive (forceful, demanding, confrontational, rude, or using strong language)
- neutral (balanced, standard, and professional)
- weak (uncertain, overly apologetic, or lacking confidence)
- confusing (unclear, ambiguous, or difficult to understand)
- clear (well-articulated, direct, and easy to understand)

If the message contains profanity, insults, or aggressive language, it MUST be categorized as 'aggressive'.
If the message is very short but clear, it should be 'clear' not 'neutral'.
If the message is well-structured with good points, it should be 'clear'.
Only use 'neutral' when the message doesn't fit clearly into other categories.

Also rate the impact of this message as ONE of the following:
- high (compelling, likely to get immediate attention and response)
- medium (adequate but not exceptional)
- low (likely to be overlooked or ignored)

Rate the overall effectiveness on a scale of 1-10, where:
1-3: Poor communication that needs significant improvement
4-6: Average communication that could be improved
7-10: Effective communication that achieves its purpose

Provide brief, specific suggestions for improvement.

Return your analysis in this exact JSON format:
{
  "tone": "one of: aggressive, neutral, weak, confusing, clear",
  "impact": "one of: high, medium, low",
  "suggestions": "brief suggestions for improvement if needed, otherwise null",
  "score": number between 1-10
}
`;

    // Call OpenAI to analyze the tone
    const analysisResponse = await enhanceMessageWithAI(
      "", // Empty message since we're using the prompt for analysis
      [], // Empty context since we're providing it in the prompt
      channelName,
      prompt
    );

    // Parse the response as JSON
    try {
      // Extract JSON from the response (in case there's additional text)
      const jsonMatch = analysisResponse.match(/\{[\s\S]*\}/); 
      const jsonString = jsonMatch ? jsonMatch[0] : analysisResponse;
      
      const analysis = JSON.parse(jsonString);
      
      // Validate the analysis fields
      const validTones = ['aggressive', 'neutral', 'weak', 'confusing', 'clear'];
      const validImpacts = ['high', 'medium', 'low'];
      
      const tone = validTones.includes(analysis.tone) ? analysis.tone : 'neutral';
      const impact = validImpacts.includes(analysis.impact) ? analysis.impact : 'medium';
      const score = Number(analysis.score);
      
      return {
        tone,
        impact,
        suggestions: analysis.suggestions || null,
        score: isNaN(score) || score < 1 || score > 10 ? 5 : score
      };
    } catch (error) {
      console.error('Error parsing tone analysis response:', error, analysisResponse);
      // Return a default analysis if parsing fails
      return {
        tone: 'neutral',
        impact: 'medium',
        suggestions: 'Could not analyze tone accurately.',
        score: 5
      };
    }
  } catch (error) {
    console.error('Error analyzing tone:', error);
    // Return a default analysis if the API call fails
    return {
      tone: 'neutral',
      impact: 'medium',
      suggestions: 'Could not analyze tone due to an error.',
      score: 5
    };
  }
};
