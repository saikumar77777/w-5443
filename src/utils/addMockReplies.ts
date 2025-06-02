import { v4 as uuidv4 } from 'uuid';

// Function to add additional mock replies to existing threads in the general channel
export const addMockRepliesToGeneralChannel = () => {
  try {
    // Get the current messages from localStorage
    const allMessages = JSON.parse(localStorage.getItem('messages') || '{}');
    
    // Check if general channel exists
    if (!allMessages['general'] || !Array.isArray(allMessages['general']) || allMessages['general'].length === 0) {
      console.warn('General channel not found or empty, cannot add mock replies');
      return {
        success: false,
        message: "General channel not found or empty"
      };
    }
    
    // Current timestamp for base, and we'll go backwards in time for older messages
    const now = new Date();
    
    // Find threads with existing replies to add more to them
    const threadsWithReplies = allMessages['general'].filter((msg: any) => 
      msg.replies && Array.isArray(msg.replies) && msg.replies.length > 0
    );
    
    if (threadsWithReplies.length === 0) {
      console.warn('No threads with replies found in general channel');
      return {
        success: false,
        message: "No threads with replies found"
      };
    }
    
    // Select up to 3 threads to add replies to
    const threadsToUpdate = threadsWithReplies.slice(0, Math.min(3, threadsWithReplies.length));
    
    // Add mock replies to each selected thread
    threadsToUpdate.forEach((thread: any) => {
      const lastReplyTime = thread.replies.length > 0 
        ? new Date(thread.replies[thread.replies.length - 1].timestamp).getTime()
        : new Date(thread.timestamp).getTime();
      
      // Generate 2-3 new replies for each thread
      const numNewReplies = Math.floor(Math.random() * 2) + 2; // 2-3 replies
      
      const newReplies = [];
      
      // First reply - technical feedback
      newReplies.push({
        id: uuidv4(),
        channelId: 'general',
        userId: '4',
        username: 'John Doe',
        content: "I've been analyzing this situation further. We should consider implementing a more structured approach to handle these requirements. Maybe we can use a kanban board to track progress?",
        timestamp: new Date(lastReplyTime + 15 * 60 * 1000).toISOString(), // 15 minutes after last reply
        reactions: [{ emoji: '💡', users: ['1', '3'], count: 2 }]
      });
      
      // Second reply - agreement with suggestion
      newReplies.push({
        id: uuidv4(),
        channelId: 'general',
        userId: '1',
        username: 'Sarah Wilson',
        content: "That's a great idea, John! A kanban board would help us visualize the workflow better. I can set one up in Trello and share it with everyone by tomorrow morning. @Emma Davis would you be able to help me organize the initial tasks?",
        timestamp: new Date(lastReplyTime + 25 * 60 * 1000).toISOString(), // 25 minutes after last reply
        reactions: [{ emoji: '👍', users: ['2', '3', '4'], count: 3 }]
      });
      
      // Third reply - additional context
      if (numNewReplies > 2) {
        newReplies.push({
          id: uuidv4(),
          channelId: 'general',
          userId: '3',
          username: 'Emma Davis',
          content: "Absolutely, Sarah! I'd be happy to help. I've already started documenting some of the key tasks we need to track. I'll send you my notes this afternoon. Also, I think we should schedule a quick sync meeting with the client to ensure we're aligned on priorities.",
          timestamp: new Date(lastReplyTime + 40 * 60 * 1000).toISOString(), // 40 minutes after last reply
          reactions: [{ emoji: '🙌', users: ['1', '2'], count: 2 }]
        });
      }
      
      // Add the new replies to the thread
      thread.replies = [...thread.replies, ...newReplies];
      thread.replyCount = thread.replies.length;
      
      // Update thread participants if needed
      if (!thread.threadParticipants) {
        thread.threadParticipants = [];
      }
      
      // Add unique participants
      const participantIds = new Set(thread.threadParticipants);
      newReplies.forEach((reply: any) => {
        if (!participantIds.has(reply.userId)) {
          thread.threadParticipants.push(reply.userId);
          participantIds.add(reply.userId);
        }
      });
    });
    
    // Add more mock replies to the first thread (if it exists)
    if (threadsToUpdate.length > 0) {
      const firstThread = threadsToUpdate[0];
      const lastReplyTime = firstThread.replies.length > 0 
        ? new Date(firstThread.replies[firstThread.replies.length - 1].timestamp).getTime()
        : new Date(firstThread.timestamp).getTime();
      
      // Add 4 more detailed replies to make it a longer conversation
      const additionalReplies = [
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '5',
          username: 'Alex Johnson',
          content: "Sorry for jumping in late on this thread. I've been reviewing the client's requirements and I think we need to clarify a few points before proceeding. Some of the features they're asking for seem to overlap with what we're already building in Phase 2.",
          timestamp: new Date(lastReplyTime + 55 * 60 * 1000).toISOString(), // 55 minutes after last reply
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '2',
          username: 'Mike Chen',
          content: "Good catch, Alex. I noticed that too. Let's create a comparison document to highlight the overlaps and potential conflicts. This will help us have a more productive conversation with the client.",
          timestamp: new Date(lastReplyTime + 70 * 60 * 1000).toISOString(), // 70 minutes after last reply
          reactions: [{ emoji: '👀', users: ['1', '5'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '1',
          username: 'Sarah Wilson',
          content: "I've just spoken with the client's project manager. They're open to a call tomorrow at 2 PM to discuss these points. @John Doe @Emma Davis can you both join? I'll send a calendar invite shortly.",
          timestamp: new Date(lastReplyTime + 85 * 60 * 1000).toISOString(), // 85 minutes after last reply
          reactions: [{ emoji: '✅', users: ['3', '4'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'general',
          userId: '4',
          username: 'John Doe',
          content: "I'll be there. I've also prepared a preliminary analysis of the technical implications of these new requirements. There are some challenges with the current architecture that we need to address if we want to implement these features efficiently. I'll share my screen during the call to walk everyone through it.",
          timestamp: new Date(lastReplyTime + 100 * 60 * 1000).toISOString(), // 100 minutes after last reply
          reactions: [{ emoji: '🚀', users: ['1', '2', '3', '5'], count: 4 }]
        }
      ];
      
      // Add the additional replies to the first thread
      firstThread.replies = [...firstThread.replies, ...additionalReplies];
      firstThread.replyCount = firstThread.replies.length;
      
      // Update thread participants
      const participantIds = new Set(firstThread.threadParticipants || []);
      additionalReplies.forEach((reply: any) => {
        if (!participantIds.has(reply.userId)) {
          if (!firstThread.threadParticipants) {
            firstThread.threadParticipants = [];
          }
          firstThread.threadParticipants.push(reply.userId);
          participantIds.add(reply.userId);
        }
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('messages', JSON.stringify(allMessages));
    
    return {
      success: true,
      message: `Added mock replies to ${threadsToUpdate.length} threads in general channel`
    };
  } catch (error) {
    console.error("Error adding mock replies:", error);
    return {
      success: false,
      message: "Failed to add mock replies"
    };
  }
};

// Function to add a completely new thread with many replies
export const addNewThreadWithManyReplies = () => {
  try {
    // Get the current messages from localStorage
    const allMessages = JSON.parse(localStorage.getItem('messages') || '{}');
    
    // Check if general channel exists
    if (!allMessages['general']) {
      allMessages['general'] = [];
    }
    
    // Current timestamp for base
    const now = new Date();
    
    // Create a new thread parent message
    const newThreadParentId = uuidv4();
    const newThreadParent = {
      id: newThreadParentId,
      channelId: 'general',
      userId: '2',
      username: 'Mike Chen',
      content: "Team, I'd like to propose a new approach for our frontend architecture. After researching several options, I think we should consider adopting a micro-frontend strategy for our next major release. This would allow teams to work more independently and deploy features faster.",
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      reactions: [
        { emoji: '🔥', users: ['1', '3', '4'], count: 3 }
      ],
      replies: [],
      replyCount: 0,
      threadParticipants: ['2']
    };
    
    // Create 7-9 detailed replies for this thread
    const replies = [
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '4',
        username: 'John Doe',
        content: "Interesting proposal, Mike. I've worked with micro-frontends at my previous company. They definitely have advantages for large teams, but there's also added complexity in terms of shared state management and consistent UI. What specific problems are we trying to solve with this approach?",
        timestamp: new Date(now.getTime() - 7.8 * 60 * 60 * 1000).toISOString(),
        reactions: []
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '2',
        username: 'Mike Chen',
        content: "Great question, John. The main issues I'm seeing are: 1) Release coordination between teams is becoming a bottleneck, 2) Our monolithic frontend is getting too large and complex, and 3) We want to allow teams to choose the best tools for their specific features rather than being locked into a single framework.",
        timestamp: new Date(now.getTime() - 7.7 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '👍', users: ['4'], count: 1 }]
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '3',
        username: 'Emma Davis',
        content: "I see the benefits, but I'm concerned about the learning curve and potential fragmentation. How would we ensure a consistent user experience across these micro-frontends?",
        timestamp: new Date(now.getTime() - 7.5 * 60 * 60 * 1000).toISOString(),
        reactions: []
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '2',
        username: 'Mike Chen',
        content: "That's a valid concern, Emma. I think we'd need to invest in a strong design system and shared component library first. We could use something like Storybook to document and showcase all UI components. We'd also need to establish clear guidelines for state management and inter-app communication.",
        timestamp: new Date(now.getTime() - 7.4 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '💡', users: ['1', '3'], count: 2 }]
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '1',
        username: 'Sarah Wilson',
        content: "From a product perspective, I like the idea of more independent deployments. It would allow us to get features to users faster. But I'm also wondering about the impact on performance. Would users experience slower load times with multiple separate applications?",
        timestamp: new Date(now.getTime() - 7.2 * 60 * 60 * 1000).toISOString(),
        reactions: []
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '5',
        username: 'Alex Johnson',
        content: "Performance is definitely something we need to consider carefully. We'd need to implement proper code splitting, lazy loading, and potentially look at module federation. There are also implications for SEO and analytics that we should discuss.",
        timestamp: new Date(now.getTime() - 7.0 * 60 * 60 * 1000).toISOString(),
        reactions: []
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '4',
        username: 'John Doe',
        content: "I think this is worth exploring further. Maybe we could start with a small proof of concept? We could take one feature that's relatively isolated and implement it as a micro-frontend to learn from the experience before committing to a full architecture change.",
        timestamp: new Date(now.getTime() - 6.8 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '👍', users: ['1', '2', '3', '5'], count: 4 }]
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '2',
        username: 'Mike Chen',
        content: "That's a great approach, John. I was thinking we could use the new dashboard feature as our pilot. It's relatively self-contained but still complex enough to test the architecture properly. I'll put together a more detailed proposal with technical options and a suggested implementation plan by next week.",
        timestamp: new Date(now.getTime() - 6.5 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '🚀', users: ['1', '3', '4'], count: 3 }]
      },
      {
        id: uuidv4(),
        channelId: 'general',
        userId: '1',
        username: 'Sarah Wilson',
        content: "Sounds like a solid plan. Let's schedule a dedicated architecture review meeting once Mike's proposal is ready. I'll make sure we have the right stakeholders involved. This could be a significant improvement to our development workflow if implemented correctly.",
        timestamp: new Date(now.getTime() - 6.3 * 60 * 60 * 1000).toISOString(),
        reactions: [{ emoji: '📅', users: ['2', '3', '4', '5'], count: 4 }]
      }
    ];
    
    // Add replies to the thread
    newThreadParent.replies = replies;
    newThreadParent.replyCount = replies.length;
    
    // Update thread participants
    const participantIds = new Set(['2']); // Start with the thread creator
    replies.forEach((reply) => {
      if (!participantIds.has(reply.userId)) {
        newThreadParent.threadParticipants.push(reply.userId);
        participantIds.add(reply.userId);
      }
    });
    
    // Add the new thread to the general channel
    allMessages['general'].push(newThreadParent);
    
    // Sort messages by timestamp
    allMessages['general'].sort((a: any, b: any) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
    
    // Save back to localStorage
    localStorage.setItem('messages', JSON.stringify(allMessages));
    
    return {
      success: true,
      message: "Added new thread with many replies to general channel"
    };
  } catch (error) {
    console.error("Error adding new thread:", error);
    return {
      success: false,
      message: "Failed to add new thread"
    };
  }
};
