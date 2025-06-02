import { v4 as uuidv4 } from 'uuid';

// Function to add mock threads and replies to the general and tech channels
export const addMockThreadsToChannels = () => {
  try {
    // Get the current messages from localStorage
    const allMessages = JSON.parse(localStorage.getItem('messages') || '{}');
    
    // Check if general channel exists
    if (!allMessages['general']) {
      allMessages['general'] = [];
    }
    
    // Current timestamp for base, and we'll go backwards in time for older messages
    const now = new Date();
    
    // Mock thread 1: Project Discussion
    const thread1ParentId = uuidv4();
    const thread1Parent = {
      id: thread1ParentId,
      channelId: 'general',
      userId: '1',
      username: 'Sarah Wilson',
      content: "Hey team, I've been reviewing our project timeline and I think we need to adjust some of our milestones. The client has requested additional features that weren't in our initial scope.",
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      reactions: [
        { emoji: '👍', users: ['2', '3'], count: 2 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '2',
          username: 'Mike Chen',
          content: "I agree. The new requirements will definitely impact our delivery date. We should schedule a meeting to discuss this with the client.",
          timestamp: new Date(now.getTime() - 2.8 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '3',
          username: 'Emma Davis',
          content: "Let's prepare a revised timeline document before the meeting. I can start working on it today.",
          timestamp: new Date(now.getTime() - 2.5 * 60 * 60 * 1000).toISOString(),
          reactions: [
            { emoji: '🙌', users: ['1', '2'], count: 2 }
          ]
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '4',
          username: 'John Doe',
          content: "I've already started documenting the additional requirements. I'll share the document with everyone by EOD.",
          timestamp: new Date(now.getTime() - 2.2 * 60 * 60 * 1000).toISOString(),
          reactions: []
        }
      ],
      replyCount: 3
    };
    
    // Mock thread 2: Technical Discussion
    const thread2ParentId = uuidv4();
    const thread2Parent = {
      id: thread2ParentId,
      channelId: 'general',
      userId: '3',
      username: 'Emma Davis',
      content: "I'm encountering an issue with the API integration. The authentication flow works in development but fails in the staging environment. Has anyone else experienced this?",
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      reactions: [],
      replies: [
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '2',
          username: 'Mike Chen',
          content: "Yes, I had a similar issue last week. It's related to the environment variables. The staging environment uses different API keys.",
          timestamp: new Date(now.getTime() - 4.8 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '3',
          username: 'Emma Davis',
          content: "Thanks Mike! I'll check the environment configuration. Do you know where the staging keys are stored?",
          timestamp: new Date(now.getTime() - 4.7 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '2',
          username: 'Mike Chen',
          content: "They should be in the .env.staging file. If you don't have access, ask John - he's the one who set up the CI/CD pipeline.",
          timestamp: new Date(now.getTime() - 4.6 * 60 * 60 * 1000).toISOString(),
          reactions: [
            { emoji: '👍', users: ['3'], count: 1 }
          ]
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '4',
          username: 'John Doe',
          content: "I've just sent you the staging credentials via a secure channel. Let me know if you still have issues after updating the environment variables.",
          timestamp: new Date(now.getTime() - 4.4 * 60 * 60 * 1000).toISOString(),
          reactions: [
            { emoji: '🙏', users: ['3'], count: 1 }
          ]
        }
      ],
      replyCount: 4
    };
    
    // Mock thread 3: Design Review
    const thread3ParentId = uuidv4();
    const thread3Parent = {
      id: thread3ParentId,
      channelId: 'general',
      userId: '1',
      username: 'Sarah Wilson',
      content: "The design team has shared the updated mockups for the dashboard. You can view them here: https://figma.com/file/mockup123. Please provide your feedback by tomorrow.",
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      reactions: [
        { emoji: '👀', users: ['2', '3', '4'], count: 3 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '4',
          username: 'John Doe',
          content: "The new design looks great! I especially like the improved data visualization components. One concern though - the mobile layout seems a bit cluttered.",
          timestamp: new Date(now.getTime() - 7.5 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '2',
          username: 'Mike Chen',
          content: "I agree with John about the mobile view. Maybe we can simplify it by using a tabbed interface instead of trying to show everything at once?",
          timestamp: new Date(now.getTime() - 7.2 * 60 * 60 * 1000).toISOString(),
          reactions: [
            { emoji: '💡', users: ['1', '4'], count: 2 }
          ]
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '1',
          username: 'Sarah Wilson',
          content: "That's a good suggestion, Mike. I'll relay this feedback to the design team and ask them to explore a tabbed interface for mobile.",
          timestamp: new Date(now.getTime() - 6.8 * 60 * 60 * 1000).toISOString(),
          reactions: []
        }
      ],
      replyCount: 3
    };
    
    // Add more regular messages to general channel
    const generalMessages = [
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '1',
        username: 'Sarah Wilson',
        content: "Good morning team! Hope everyone had a great weekend. Let's make this week productive!",
        timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '☀️', users: ['2', '3', '4'], count: 3 }],
        replies: [],
        replyCount: 0,
        threadParticipants: []
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '2',
        username: 'Mike Chen',
        content: "Just a reminder that we have the quarterly review meeting tomorrow at 10 AM. Please prepare your progress reports.",
        timestamp: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '👍', users: ['1', '3', '4'], count: 3 }],
        replies: [],
        replyCount: 0,
        threadParticipants: []
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '4',
        username: 'John Doe',
        content: "Has anyone seen the latest competitor analysis report? I can't find it in the shared drive.",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000).toISOString(),
        reactions: [],
        replies: [],
        replyCount: 0,
        threadParticipants: []
      }
    ];
    
    // Create Tech channel threads
    const techThread1ParentId = uuidv4();
    const techThread1Parent = {
      id: techThread1ParentId,
      channelId: 'tech',
      userId: '2',
      username: 'Mike Chen',
      content: "I'm thinking of migrating our backend services to a serverless architecture. Has anyone here worked with AWS Lambda or Azure Functions?",
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      reactions: [{ emoji: '💡', users: ['3', '4'], count: 2 }],
      replies: [
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "I've implemented several projects using AWS Lambda. It's great for microservices and can significantly reduce operational costs. Happy to share my experience.",
          timestamp: new Date(now.getTime() - 5.8 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['2'], count: 1 }],
          threadParticipants: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "We should consider cold start times and execution limits. Some of our processes might not be suitable for serverless. Maybe we can do a hybrid approach?",
          timestamp: new Date(now.getTime() - 5.5 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🤔', users: ['2', '4'], count: 2 }],
          threadParticipants: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "Good points, Emma. Let's schedule a technical discussion to evaluate which services would benefit most from serverless architecture.",
          timestamp: new Date(now.getTime() - 5.2 * 60 * 60 * 1000).toISOString(),
          reactions: [],
          threadParticipants: []
        }
      ],
      replyCount: 3,
      threadParticipants: ['2', '3', '4']
    };
    
    const techThread2ParentId = uuidv4();
    const techThread2Parent = {
      id: techThread2ParentId,
      channelId: 'tech',
      userId: '3',
      username: 'Emma Davis',
      content: "We need to address the increasing technical debt in our codebase. I've identified several critical areas that require refactoring.",
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      reactions: [{ emoji: '💯', users: ['2', '4'], count: 2 }],
      replies: [
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "Agreed. The authentication module is particularly problematic. It's causing most of our production bugs.",
          timestamp: new Date(now.getTime() - 3.8 * 60 * 60 * 1000).toISOString(),
          reactions: [],
          threadParticipants: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "Let's create a prioritized list and allocate 20% of our sprint capacity to addressing technical debt. We can't let it accumulate further.",
          timestamp: new Date(now.getTime() - 3.5 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['3', '4', '1'], count: 3 }],
          threadParticipants: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '1',
          username: 'Sarah Wilson',
          content: "From a product perspective, I support this initiative. Quality and maintainability are just as important as new features.",
          timestamp: new Date(now.getTime() - 3.2 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🙌', users: ['2', '3', '4'], count: 3 }],
          threadParticipants: []
        }
      ],
      replyCount: 3,
      threadParticipants: ['1', '2', '3', '4']
    };
    
    // Add regular messages to tech channel
    const techMessages = [
      {
        id: uuidv4(),
        channelId: 'tech',
        userId: '4',
        username: 'John Doe',
        content: "I've pushed the latest API documentation to our wiki. Please review when you get a chance.",
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '👀', users: ['2', '3'], count: 2 }],
        replies: [],
        replyCount: 0,
        threadParticipants: []
      },
      {
        id: uuidv4(),
        channelId: 'tech',
        userId: '2',
        username: 'Mike Chen',
        content: "The new CI/CD pipeline is now operational. Build times have been reduced by 40%!",
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '🚀', users: ['1', '3', '4'], count: 3 }],
        replies: [],
        replyCount: 0,
        threadParticipants: []
      }
    ];
    
    // Add these thread parent messages to the general channel
    // First check if they already exist to avoid duplicates
    const existingGeneralIds = new Set(allMessages['general']?.map((msg: any) => msg.id) || []);
    
    if (!existingGeneralIds.has(thread1ParentId)) {
      allMessages['general'] = allMessages['general'] || [];
      allMessages['general'].push(thread1Parent);
    }
    
    if (!existingGeneralIds.has(thread2ParentId)) {
      allMessages['general'] = allMessages['general'] || [];
      allMessages['general'].push(thread2Parent);
    }
    
    if (!existingGeneralIds.has(thread3ParentId)) {
      allMessages['general'] = allMessages['general'] || [];
      allMessages['general'].push(thread3Parent);
    }
    
    // Add regular messages to general channel
    generalMessages.forEach(msg => {
      if (!existingGeneralIds.has(msg.id)) {
        allMessages['general'] = allMessages['general'] || [];
        allMessages['general'].push(msg);
      }
    });
    
    // Add tech channel messages and threads
    const existingTechIds = new Set(allMessages['tech']?.map((msg: any) => msg.id) || []);
    
    if (!existingTechIds.has(techThread1ParentId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(techThread1Parent);
    }
    
    if (!existingTechIds.has(techThread2ParentId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(techThread2Parent);
    }
    
    // Add regular messages to tech channel
    techMessages.forEach(msg => {
      if (!existingTechIds.has(msg.id)) {
        allMessages['tech'] = allMessages['tech'] || [];
        allMessages['tech'].push(msg);
      }
    });
    
    // Sort messages by timestamp for each channel
    if (allMessages['general']) {
      allMessages['general'].sort((a: any, b: any) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
    }
    
    if (allMessages['tech']) {
      allMessages['tech'].sort((a: any, b: any) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('messages', JSON.stringify(allMessages));
    
    return {
      success: true,
      message: "Mock threads added to general channel"
    };
  } catch (error) {
    console.error("Error adding mock threads:", error);
    return {
      success: false,
      message: "Failed to add mock threads"
    };
  }
};
