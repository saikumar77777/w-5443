import { User } from '@/contexts/AuthContext';
import { Message } from '@/contexts/MessageContext';
import { enhanceMessageWithAI } from '@/services/openai';

export const ZANI_TRIGGER = '@zani';

/**
 * Check if a message contains @zani mention
 */
export const containsZaniMention = (message: string): boolean => {
  return message.toLowerCase().includes(ZANI_TRIGGER);
};

/**
 * Extract the query part from a message containing @zani
 */
export const extractZaniQuery = (message: string): string => {
  if (!containsZaniMention(message)) {
    return '';
  }
  
  const triggerIndex = message.toLowerCase().indexOf(ZANI_TRIGGER);
  return message.slice(triggerIndex + ZANI_TRIGGER.length).trim();
};

/**
 * Process a query with AI and return a response
 */
export const processZaniQuery = async (
  query: string, 
  channelMessages: Message[], 
  channelId: string
): Promise<string> => {
  try {
    // Very explicit prompt to force direct answers only
    const directAnswerPrompt = `IMPORTANT INSTRUCTIONS: Provide ONLY a direct answer to this question without ANY rephrasing, reflection, or mentioning of the question itself. DO NOT start with phrases like "In my view" or "I think". DO NOT refer to the question or use @zani in your response. Just answer directly as if continuing a conversation: ${query}`;
    
    // Use the AI enhancement function with our custom prompt
    const response = await enhanceMessageWithAI(directAnswerPrompt, channelMessages, channelId);
    
    // Aggressive cleaning to remove any question rephrasing or prefixes
    let cleanedResponse = response
      // Remove any mention of the original question
      .replace(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|@zani)`, 'gi'), '')
      // Remove common AI response prefixes
      .replace(/^(here'?s?|the answer is|to answer your question|in response to your question)[^a-zA-Z0-9]*:/i, '')
      .replace(/^I would say that /i, '')
      .replace(/^(well|so|okay|sure)[,]?\s+/i, '')
      .replace(/^(in my (view|opinion)|i think|from my perspective)[,]?\s+/i, '')
      .replace(/^(regarding|about|on the topic of|concerning)[^a-zA-Z0-9]*:/i, '')
      .replace(/^@zani[,]?\s+/i, '')
      // Remove any sentence that contains the word "you asked" or "your question"
      .replace(/[^.!?]*\b(you ask|your question|the question|you mentioned)[^.!?]*[.!?]/gi, '')
      .trim();
    
    // If the response is empty after cleaning, return a simple fallback
    if (!cleanedResponse) {
      return "Life is meaningful when we find purpose and connection with others.";
    }
    
    return cleanedResponse;
  } catch (error) {
    console.error('Error processing Zani query:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
};

/**
 * Highlight @zani mentions in a message
 */
export const highlightZaniMentions = (message: string): string => {
  if (!containsZaniMention(message)) {
    return message;
  }
  
  // This is a simple implementation - in a real app, you'd want to use a more robust approach
  // that doesn't break HTML or markdown formatting
  return message.replace(
    new RegExp(`${ZANI_TRIGGER}\s*`, 'gi'),
    '<span class="text-blue-500 font-semibold">$&</span>'
  );
};
