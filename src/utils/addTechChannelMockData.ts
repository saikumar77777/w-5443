import { v4 as uuidv4 } from 'uuid';

// Function to add mock threads and replies to the tech channel
export const addTechChannelMockData = () => {
  try {
    // Get the current messages from localStorage
    // Use the same key as in MessageContext (messages_3 for workspace ID 3)
    const allMessages = JSON.parse(localStorage.getItem('messages_3') || '{}');
    
    // Check if tech channel exists
    if (!allMessages['tech']) {
      allMessages['tech'] = [];
    }
    
    // Current timestamp for base, and we'll go backwards in time for older messages
    const now = new Date();
    
    // Mock thread 1: Architecture Discussion
    const thread1ParentId = uuidv4();
    const thread1Parent = {
      id: thread1ParentId,
      channelId: 'tech',
      userId: '2',
      username: 'Mike Chen',
      content: "I've been researching microservices architecture for our next project. I think it could solve some of our scaling issues. Has anyone implemented this pattern before? What are your thoughts on the trade-offs between microservices and monolithic architecture?",
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      reactions: [
        { emoji: '🤔', users: ['1', '3', '4'], count: 3 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "I've worked with microservices at my previous company. They definitely have advantages for large teams, but there's significant operational complexity. You need solid DevOps practices, service discovery, and monitoring in place.",
          timestamp: new Date(now.getTime() - 11.8 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['2', '3'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "I agree with John. The biggest challenge we faced was data consistency across services. You'll need to decide between eventual consistency or implement distributed transactions, which can be complex.",
          timestamp: new Date(now.getTime() - 11.6 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "Good points. What about starting with a modular monolith that's designed to be split into microservices later? That way we can get the benefits of separation of concerns without the immediate operational complexity.",
          timestamp: new Date(now.getTime() - 11.4 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '💡', users: ['1', '3', '4'], count: 3 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '5',
          username: 'Alex Johnson',
          content: "That's a pragmatic approach, Mike. We did something similar at my last job. We used domain-driven design principles to create bounded contexts within the monolith, which made it easier to extract microservices later when we had a clear need for independent scaling.",
          timestamp: new Date(now.getTime() - 11.2 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '1',
          username: 'Sarah Wilson',
          content: "From a product perspective, I'm concerned about how this architectural choice might impact our delivery timeline. Would starting with microservices slow down our initial development?",
          timestamp: new Date(now.getTime() - 11.0 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "That's a valid concern, Sarah. There's definitely an upfront cost in setting up the infrastructure for microservices. If time-to-market is critical, Mike's approach of starting with a modular monolith might be better.",
          timestamp: new Date(now.getTime() - 10.8 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['1', '2'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "I'll put together a more detailed proposal comparing both approaches with timelines and resource requirements. I think we need to consider our team size and experience as well. We don't have a large platform team to manage the operational complexity of microservices yet.",
          timestamp: new Date(now.getTime() - 10.6 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🚀', users: ['1', '3', '4', '5'], count: 4 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "Looking forward to seeing that proposal, Mike. Let me know if you need any input on the data architecture aspects. I have some experience with event sourcing patterns that might be relevant regardless of which approach we choose.",
          timestamp: new Date(now.getTime() - 10.4 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '✅', users: ['2'], count: 1 }]
        }
      ],
      replyCount: 8,
      threadParticipants: ['1', '2', '3', '4', '5']
    };
    
    // Mock thread 2: Frontend Framework Discussion
    const thread2ParentId = uuidv4();
    const thread2Parent = {
      id: thread2ParentId,
      channelId: 'tech',
      userId: '3',
      username: 'Emma Davis',
      content: "We need to decide on a frontend framework for the new dashboard project. I've been comparing React, Vue, and Svelte. Each has its pros and cons. What are your experiences with these frameworks, and which would you recommend for our use case?",
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      reactions: [
        { emoji: '👀', users: ['1', '2', '4', '5'], count: 4 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "I've used React extensively and find its ecosystem and community support to be major advantages. The learning curve can be steep for newcomers though, especially with hooks and context.",
          timestamp: new Date(now.getTime() - 7.8 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "Vue has been my go-to for smaller projects. It's more approachable for developers coming from jQuery or vanilla JS backgrounds. The documentation is excellent, and the template syntax feels more intuitive to me than JSX.",
          timestamp: new Date(now.getTime() - 7.6 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['5'], count: 1 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '5',
          username: 'Alex Johnson',
          content: "I've been experimenting with Svelte recently and I'm impressed by its performance and simplicity. The compiled output is tiny compared to React or Vue, and there's less boilerplate. However, the ecosystem is smaller, which could be a limitation.",
          timestamp: new Date(now.getTime() - 7.4 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🔥', users: ['3'], count: 1 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "Thanks for the insights! What about TypeScript integration? That's important for our project since we're dealing with complex data structures.",
          timestamp: new Date(now.getTime() - 7.2 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "React with TypeScript is a mature combination. The type definitions are well-maintained, and tools like Create React App have built-in TypeScript support. We use this stack for our main product and it works well.",
          timestamp: new Date(now.getTime() - 7.0 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '💯', users: ['4'], count: 1 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "Vue 3 was rewritten in TypeScript, so the integration is much better than with Vue 2. But I'd say React still has the edge here in terms of community resources and examples for TypeScript usage.",
          timestamp: new Date(now.getTime() - 6.8 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '1',
          username: 'Sarah Wilson',
          content: "From a product perspective, we should also consider the learning curve for new team members. We're planning to hire more frontend developers in Q3, and their onboarding time will be important.",
          timestamp: new Date(now.getTime() - 6.6 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['2', '3'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "Based on our discussion, I think React with TypeScript makes the most sense for us. It has strong TypeScript support, a large ecosystem, and while there is a learning curve, it's a widely used skill that new hires might already have. Let's plan to use Create React App with TypeScript for the initial setup. I'll create a starter repository this week.",
          timestamp: new Date(now.getTime() - 6.4 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🚀', users: ['1', '2', '4', '5'], count: 4 }]
        }
      ],
      replyCount: 8,
      threadParticipants: ['1', '2', '3', '4', '5']
    };
    
    // Mock thread 3: CI/CD Pipeline Discussion
    const thread3ParentId = uuidv4();
    const thread3Parent = {
      id: thread3ParentId,
      channelId: 'tech',
      userId: '4',
      username: 'John Doe',
      content: "Our CI/CD pipeline is starting to show its age. Build times are increasing, and we've had several deployment failures recently. I think it's time for an overhaul. What modern CI/CD tools and practices should we consider?",
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      reactions: [
        { emoji: '⚠️', users: ['2', '3', '5'], count: 3 }
      ],
      replies: [
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "I've been impressed with GitHub Actions lately. It integrates well with our GitHub repositories, and the YAML configuration is straightforward. We could migrate our Jenkins jobs over time.",
          timestamp: new Date(now.getTime() - 4.8 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['4'], count: 1 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '5',
          username: 'Alex Johnson',
          content: "CircleCI is another option worth considering. Their orbs (reusable configuration packages) can save a lot of setup time. They also have good parallelization features that could help with our increasing build times.",
          timestamp: new Date(now.getTime() - 4.6 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "Whatever tool we choose, we should focus on improving our test strategy too. Our current end-to-end tests are flaky and slow. Maybe we should adopt a testing trophy approach with more unit and integration tests, and fewer E2E tests?",
          timestamp: new Date(now.getTime() - 4.4 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '💯', users: ['2', '4'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "Good point, Emma. Test reliability is a major issue. I like the testing trophy approach. We should also look into test parallelization and possibly splitting our monorepo to reduce build scope.",
          timestamp: new Date(now.getTime() - 4.2 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "For deployment, we should consider moving to a more GitOps-oriented workflow. Tools like ArgoCD or Flux can help with Kubernetes deployments, ensuring our infrastructure matches what's in our Git repos.",
          timestamp: new Date(now.getTime() - 4.0 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🔄', users: ['4', '5'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '5',
          username: 'Alex Johnson',
          content: "Caching is another area we could improve. Both GitHub Actions and CircleCI have good caching mechanisms for dependencies, which could significantly reduce build times.",
          timestamp: new Date(now.getTime() - 3.8 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '⚡', users: ['2', '4'], count: 2 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '1',
          username: 'Sarah Wilson',
          content: "These all sound like good technical improvements. From a process perspective, we should also consider how these changes will affect our release cadence. The goal should be to enable more frequent, smaller releases with less risk.",
          timestamp: new Date(now.getTime() - 3.6 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '👍', users: ['2', '3', '4'], count: 3 }]
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "Thanks everyone for the input. I'll create a proposal document comparing GitHub Actions and CircleCI, with a focus on improving test reliability, build times, and enabling a more GitOps-oriented deployment process. I'll share it by the end of the week for further discussion.",
          timestamp: new Date(now.getTime() - 3.4 * 60 * 60 * 1000).toISOString(),
          reactions: [{ emoji: '🙌', users: ['1', '2', '3', '5'], count: 4 }]
        }
      ],
      replyCount: 8,
      threadParticipants: ['1', '2', '3', '4', '5']
    };
    
    // New thread with no emoji reactions
    const noEmojiThreadId = uuidv4();
    const noEmojiThread = {
      id: noEmojiThreadId,
      channelId: 'tech',
      userId: '3',
      username: 'Emma Davis',
      content: "I've been experimenting with WebAssembly for our frontend performance bottlenecks. Initial results show a 40% improvement in our data processing functions. Would anyone be interested in a demo at our next tech meeting?",
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      reactions: [],
      replies: [
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "That sounds impressive, Emma! I'd definitely be interested in seeing the demo. What language are you compiling to WebAssembly?",
          timestamp: new Date(now.getTime() - 7.8 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "I'm using Rust. The tooling is really mature and the performance is excellent. The learning curve was a bit steep, but worth it.",
          timestamp: new Date(now.getTime() - 7.6 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '4',
          username: 'John Doe',
          content: "Interesting choice! We've been considering WebAssembly too, but with AssemblyScript since it's closer to TypeScript. Have you compared the two?",
          timestamp: new Date(now.getTime() - 7.4 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "I did look at AssemblyScript initially. It's definitely easier to get started with if you're already familiar with TypeScript. But I found Rust's performance and safety guarantees more compelling for our use case.",
          timestamp: new Date(now.getTime() - 7.2 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '5',
          username: 'Alex Johnson',
          content: "How are you handling the integration with our React components? Are you using direct bindings or some kind of message passing?",
          timestamp: new Date(now.getTime() - 7.0 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "I'm using wasm-bindgen to create JavaScript bindings. For the React integration, I've created a custom hook that manages the WebAssembly module lifecycle and provides the optimized functions to components.",
          timestamp: new Date(now.getTime() - 6.8 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '2',
          username: 'Mike Chen',
          content: "That's a clean approach. Have you encountered any debugging challenges? That's been my main concern with WebAssembly.",
          timestamp: new Date(now.getTime() - 6.6 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '3',
          username: 'Emma Davis',
          content: "Yes, debugging was tricky at first. I'm using wasm-pack with its dev server for development, which provides source maps. For production, I've added extensive logging at the boundary between JS and WebAssembly. I'll cover the debugging workflow in the demo too.",
          timestamp: new Date(now.getTime() - 6.4 * 60 * 60 * 1000).toISOString(),
          reactions: []
        },
        {
          id: uuidv4(),
          channelId: 'tech',
          userId: '1',
          username: 'Sarah Wilson',
          content: "This sounds like a great innovation, Emma. I'd like to understand the impact on our build pipeline and deployment process. Would this require significant changes to our CI/CD?",
          timestamp: new Date(now.getTime() - 6.2 * 60 * 60 * 1000).toISOString(),
          reactions: []
        }
      ],
      replyCount: 9,
      threadParticipants: ['1', '2', '3', '4', '5']
    };
    
    // New message with a single emoji reaction
    const singleEmojiMsgId = uuidv4();
    const singleEmojiMsg = {
      id: singleEmojiMsgId,
      channelId: 'tech',
      userId: '5',
      username: 'Alex Johnson',
      content: "Just pushed a major refactoring of our authentication service. It now uses JWT with refresh tokens and has much better error handling. Code review appreciated!",
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      reactions: [{ emoji: '👀', users: ['2', '4'], count: 2 }],
      replies: [],
      replyCount: 0,
      threadParticipants: []
    };
    
    // New message with no reactions or replies
    const plainMsgId = uuidv4();
    const plainMsg = {
      id: plainMsgId,
      channelId: 'tech',
      userId: '1',
      username: 'Sarah Wilson',
      content: "The product team has updated the Q3 roadmap document. Please review the technical requirements section and let me know if the estimates look realistic.",
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      reactions: [],
      replies: [],
      replyCount: 0,
      threadParticipants: []
    };
    
    // Add these thread parent messages to the tech channel
    // First check if they already exist to avoid duplicates
    const existingTechIds = new Set(allMessages['tech']?.map((msg: any) => msg.id) || []);
    
    if (!existingTechIds.has(thread1ParentId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(thread1Parent);
    }
    
    if (!existingTechIds.has(thread2ParentId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(thread2Parent);
    }
    
    if (!existingTechIds.has(thread3ParentId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(thread3Parent);
    }
    
    // Add the new messages with controlled emoji usage
    if (!existingTechIds.has(noEmojiThreadId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(noEmojiThread);
    }
    
    if (!existingTechIds.has(singleEmojiMsgId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(singleEmojiMsg);
    }
    
    if (!existingTechIds.has(plainMsgId)) {
      allMessages['tech'] = allMessages['tech'] || [];
      allMessages['tech'].push(plainMsg);
    }
    
    // Sort messages by timestamp for the tech channel
    if (allMessages['tech']) {
      allMessages['tech'].sort((a: any, b: any) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
    }
    
    // Save back to localStorage using the same key as in MessageContext
    localStorage.setItem('messages_3', JSON.stringify(allMessages));
    
    return {
      success: true,
      message: "Mock threads added to tech channel"
    };
  } catch (error) {
    console.error("Error adding mock threads to tech channel:", error);
    return {
      success: false,
      message: "Failed to add mock threads to tech channel"
    };
  }
};
