import { v4 as uuidv4 } from 'uuid';

// Function to add mock conversation to the team channel in team01 workspace
export const addTeamConversation = () => {
  try {
    // Get the current messages from localStorage
    const savedMessages = localStorage.getItem('messages_3');
    const allMessages = savedMessages ? JSON.parse(savedMessages) : {};
    
    // Define the team channel key
    const channelKey = 'team01/team';
    
    // Check if team channel exists
    if (!allMessages[channelKey]) {
      allMessages[channelKey] = [];
    }
    
    // Current timestamp for base, and we'll go backwards in time for older messages
    const now = new Date();
    
    // User IDs for our conversation participants
    const users = {
      nani: { id: 'nani1', username: 'nani', avatar: 'N' },
      nikith: { id: 'nikith1', username: 'nikith', avatar: 'N' },
      sai: { id: 'sai1', username: 'sai', avatar: 'S' },
      jyosh: { id: 'jyosh1', username: 'jyosh', avatar: 'J' },
      admin: { id: 'admin1', username: 'admin', avatar: 'A' }
    };
    
    // Mock conversation about job hunting and congratulating jyosh
    
    // Message 1: Nani asking about job hunting
    const message1Id = uuidv4();
    const message1 = {
      id: message1Id,
      channelId: channelKey,
      userId: users.nani.id,
      username: users.nani.username,
      avatar: users.nani.avatar,
      content: "Hey everyone! How's the job hunting going? Any updates?",
      timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      reactions: [{ emoji: '👋', users: [users.nikith.id, users.sai.id], count: 2 }],
      replies: [],
      replyCount: 0,
      threadParticipants: []
    };
    
    // Message 2: Nikith responding about interviews
    const message2Id = uuidv4();
    const message2 = {
      id: message2Id,
      channelId: channelKey,
      userId: users.nikith.id,
      username: users.nikith.username,
      avatar: users.nikith.avatar,
      content: "I've had a couple of interviews last week. Still waiting to hear back from them. The technical rounds were pretty challenging!",
      timestamp: new Date(now.getTime() - 4.9 * 24 * 60 * 60 * 1000).toISOString(),
      reactions: [{ emoji: '🤞', users: [users.nani.id, users.sai.id, users.jyosh.id], count: 3 }],
      replies: [
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.sai.id,
          username: users.sai.username,
          avatar: users.sai.avatar,
          content: "What kind of technical questions did they ask? I have an interview coming up next week.",
          timestamp: new Date(now.getTime() - 4.8 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.nikith.id,
          username: users.nikith.username,
          avatar: users.nikith.avatar,
          content: "Lots of algorithm questions and system design. Make sure you practice your data structures!",
          timestamp: new Date(now.getTime() - 4.7 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: [users.sai.id], count: 1 }]
        }
      ],
      replyCount: 2,
      threadParticipants: [users.sai.id, users.nikith.id]
    };
    
    // Message 3: Sai sharing about application process
    const message3Id = uuidv4();
    const message3 = {
      id: message3Id,
      channelId: channelKey,
      userId: users.sai.id,
      username: users.sai.username,
      avatar: users.sai.avatar,
      content: "I've applied to about 15 companies so far. The market seems tough right now, but staying positive!",
      timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      reactions: [{ emoji: '💪', users: [users.nani.id, users.nikith.id, users.jyosh.id], count: 3 }],
      replies: [],
      replyCount: 0,
      threadParticipants: []
    };
    
    // Message 4: Jyosh hinting at good news
    const message4Id = uuidv4();
    const message4 = {
      id: message4Id,
      channelId: channelKey,
      userId: users.jyosh.id,
      username: users.jyosh.username,
      avatar: users.jyosh.avatar,
      content: "I might have some good news to share soon... 😊",
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      reactions: [
        { emoji: '👀', users: [users.nani.id, users.nikith.id, users.sai.id, users.admin.id], count: 4 },
        { emoji: '🎉', users: [users.nani.id, users.sai.id], count: 2 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.nani.id,
          username: users.nani.username,
          avatar: users.nani.avatar,
          content: "Don't keep us in suspense! What's the news?",
          timestamp: new Date(now.getTime() - 2.9 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.jyosh.id,
          username: users.jyosh.username,
          avatar: users.jyosh.avatar,
          content: "I'll share once everything is confirmed. Don't want to jinx it! 🤐",
          timestamp: new Date(now.getTime() - 2.8 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '😂', users: [users.nani.id, users.nikith.id], count: 2 }]
        }
      ],
      replyCount: 2,
      threadParticipants: [users.nani.id, users.jyosh.id]
    };
    
    // Message 5: Admin checking in
    const message5Id = uuidv4();
    const message5 = {
      id: message5Id,
      channelId: channelKey,
      userId: users.admin.id,
      username: users.admin.username,
      avatar: users.admin.avatar,
      content: "How's everyone doing with their job search? Let me know if you need any help with interview prep or resume reviews!",
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      reactions: [{ emoji: '❤️', users: [users.nani.id, users.nikith.id, users.sai.id, users.jyosh.id], count: 4 }],
      replies: [
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.sai.id,
          username: users.sai.username,
          avatar: users.sai.avatar,
          content: "Thanks admin! I'd love some feedback on my resume if you have time this week.",
          timestamp: new Date(now.getTime() - 1.9 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.admin.id,
          username: users.admin.username,
          avatar: users.admin.avatar,
          content: "Sure thing! DM me and we'll set up a time to review it together.",
          timestamp: new Date(now.getTime() - 1.8 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: [users.sai.id], count: 1 }]
        }
      ],
      replyCount: 2,
      threadParticipants: [users.sai.id, users.admin.id]
    };
    
    // Message 6: Jyosh announcing job offer
    const message6Id = uuidv4();
    const message6 = {
      id: message6Id,
      channelId: channelKey,
      userId: users.jyosh.id,
      username: users.jyosh.username,
      avatar: users.jyosh.avatar,
      content: "🎉🎉🎉 BIG NEWS EVERYONE! I got the job at TechInnovate as a Senior Developer! Starting next month with an amazing package! So excited!",
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      reactions: [
        { emoji: '🎉', users: [users.nani.id, users.nikith.id, users.sai.id, users.admin.id], count: 4 },
        { emoji: '👏', users: [users.nani.id, users.nikith.id, users.sai.id, users.admin.id], count: 4 },
        { emoji: '🚀', users: [users.nani.id, users.sai.id], count: 2 },
        { emoji: '🥳', users: [users.nikith.id, users.admin.id], count: 2 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.nani.id,
          username: users.nani.username,
          avatar: users.nani.avatar,
          content: "OMG CONGRATULATIONS!!! 🎉🎉 I knew you'd land something amazing!",
          timestamp: new Date(now.getTime() - 0.9 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '❤️', users: [users.jyosh.id], count: 1 }]
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.nikith.id,
          username: users.nikith.username,
          avatar: users.nikith.avatar,
          content: "That's fantastic news! TechInnovate is such a great company. So happy for you!",
          timestamp: new Date(now.getTime() - 0.8 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.sai.id,
          username: users.sai.username,
          avatar: users.sai.avatar,
          content: "Well deserved! You've been working so hard for this. We need to celebrate! 🍾",
          timestamp: new Date(now.getTime() - 0.7 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🙌', users: [users.jyosh.id, users.nani.id], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.admin.id,
          username: users.admin.username,
          avatar: users.admin.avatar,
          content: "Congratulations Jyosh! This is wonderful news. Your skills and dedication have paid off. We're all proud of you!",
          timestamp: new Date(now.getTime() - 0.6 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👏', users: [users.jyosh.id], count: 1 }]
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.jyosh.id,
          username: users.jyosh.username,
          avatar: users.jyosh.avatar,
          content: "Thank you all so much for your support! Couldn't have done it without this amazing community. And yes Sai, we definitely need to celebrate! 🥳",
          timestamp: new Date(now.getTime() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
          reactions: [
            { emoji: '❤️', users: [users.nani.id, users.nikith.id, users.sai.id, users.admin.id], count: 4 }
          ]
        }
      ],
      replyCount: 5,
      threadParticipants: [users.nani.id, users.nikith.id, users.sai.id, users.admin.id, users.jyosh.id]
    };
    
    // Message 7: Nani suggesting a celebration
    const message7Id = uuidv4();
    const message7 = {
      id: message7Id,
      channelId: channelKey,
      userId: users.nani.id,
      username: users.nani.username,
      avatar: users.nani.avatar,
      content: "We should organize a virtual party to celebrate Jyosh's success! How about this Saturday evening?",
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      reactions: [
        { emoji: '👍', users: [users.nikith.id, users.sai.id, users.jyosh.id, users.admin.id], count: 4 },
        { emoji: '🎮', users: [users.nikith.id, users.jyosh.id], count: 2 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.jyosh.id,
          username: users.jyosh.username,
          avatar: users.jyosh.avatar,
          content: "I'm totally free on Saturday! Can't wait to celebrate with you all!",
          timestamp: new Date(now.getTime() - 11 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.sai.id,
          username: users.sai.username,
          avatar: users.sai.avatar,
          content: "Saturday works for me too! Should we do a game night or just hang out?",
          timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: channelKey,
          userId: users.nikith.id,
          username: users.nikith.username,
          avatar: users.nikith.avatar,
          content: "Let's do both! We can play some games and just catch up. I'll bring the virtual drinks! 🍻",
          timestamp: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🎮', users: [users.jyosh.id, users.sai.id, users.nani.id], count: 3 }]
        }
      ],
      replyCount: 3,
      threadParticipants: [users.jyosh.id, users.sai.id, users.nikith.id]
    };
    
    // Add all messages to the team channel
    const existingIds = new Set(allMessages[channelKey]?.map((msg: any) => msg.id) || []);
    
    const messagesToAdd = [message1, message2, message3, message4, message5, message6, message7];
    
    messagesToAdd.forEach(msg => {
      if (!existingIds.has(msg.id)) {
        allMessages[channelKey] = allMessages[channelKey] || [];
        allMessages[channelKey].push(msg);
      }
    });
    
    // Sort messages by timestamp
    if (allMessages[channelKey]) {
      allMessages[channelKey].sort((a: any, b: any) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('messages_3', JSON.stringify(allMessages));
    
    return {
      success: true,
      message: "Mock conversation added to team channel in team01 workspace"
    };
  } catch (error) {
    console.error("Error adding mock conversation:", error);
    return {
      success: false,
      message: "Failed to add mock conversation"
    };
  }
};
