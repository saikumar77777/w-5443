
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface Message {
  id: string;
  channelId: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  timestamp: string;
  reactions?: Array<{
    emoji: string;
    users: string[];
    count: number;
  }>;
  replies?: Message[];
  replyCount?: number;
  threadParticipants?: string[];
  edited_at?: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  type: 'public' | 'private' | 'direct';
  workspace_id: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

interface MessageContextType {
  messages: { [channelId: string]: Message[] };
  channels: Channel[];
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  currentChannel: Channel | null;
  sendMessage: (channelId: string, content: string, threadId?: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  removeReaction: (messageId: string, emoji: string) => Promise<void>;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  setCurrentChannel: (channel: Channel | null) => void;
  loadWorkspaces: () => Promise<void>;
  loadChannels: (workspaceId: string) => Promise<void>;
  loadMessages: (channelId: string) => Promise<void>;
  createChannel: (workspaceId: string, name: string, description?: string, type?: 'public' | 'private') => Promise<void>;
  joinWorkspace: (workspaceId: string) => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<{ [channelId: string]: Message[] }>({});
  const [channels, setChannels] = useState<Channel[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const { user } = useAuth();

  const loadWorkspaces = async () => {
    if (!user) return;

    try {
      const { data: workspaceMembers, error } = await supabase
        .from('workspace_members')
        .select(`
          workspace_id,
          workspaces (
            id,
            name,
            slug,
            description,
            logo_url,
            owner_id,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const workspaceData = workspaceMembers
        ?.map(member => member.workspaces)
        .filter(Boolean) as Workspace[];

      setWorkspaces(workspaceData || []);
    } catch (error) {
      console.error('Error loading workspaces:', error);
    }
  };

  const loadChannels = async (workspaceId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('created_at');

      if (error) throw error;

      setChannels(data || []);
    } catch (error) {
      console.error('Error loading channels:', error);
    }
  };

  const loadMessages = async (channelId: string) => {
    if (!user) return;

    try {
      // Load main messages (not replies)
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          *,
          profiles (username, avatar_url),
          reactions (*),
          message_attachments (*)
        `)
        .eq('channel_id', channelId)
        .is('thread_id', null)
        .order('created_at');

      if (messagesError) throw messagesError;

      // Load replies for each message
      const { data: repliesData, error: repliesError } = await supabase
        .from('messages')
        .select(`
          *,
          profiles (username, avatar_url),
          reactions (*)
        `)
        .eq('channel_id', channelId)
        .not('thread_id', 'is', null)
        .order('created_at');

      if (repliesError) throw repliesError;

      // Process messages and replies
      const processedMessages: Message[] = messagesData?.map(msg => {
        const replies = repliesData?.filter(reply => reply.thread_id === msg.id) || [];
        const processedReplies: Message[] = replies.map(reply => ({
          id: reply.id,
          channelId: reply.channel_id,
          userId: reply.user_id,
          username: reply.profiles?.username || 'Unknown User',
          avatar: reply.profiles?.avatar_url,
          content: reply.content,
          timestamp: reply.created_at,
          edited_at: reply.edited_at,
          reactions: reply.reactions?.reduce((acc: any[], reaction: any) => {
            const existing = acc.find(r => r.emoji === reaction.emoji);
            if (existing) {
              existing.users.push(reaction.user_id);
              existing.count++;
            } else {
              acc.push({
                emoji: reaction.emoji,
                users: [reaction.user_id],
                count: 1
              });
            }
            return acc;
          }, []) || []
        }));

        return {
          id: msg.id,
          channelId: msg.channel_id,
          userId: msg.user_id,
          username: msg.profiles?.username || 'Unknown User',
          avatar: msg.profiles?.avatar_url,
          content: msg.content,
          timestamp: msg.created_at,
          edited_at: msg.edited_at,
          replies: processedReplies,
          replyCount: processedReplies.length,
          threadParticipants: [...new Set(processedReplies.map(r => r.userId))],
          reactions: msg.reactions?.reduce((acc: any[], reaction: any) => {
            const existing = acc.find(r => r.emoji === reaction.emoji);
            if (existing) {
              existing.users.push(reaction.user_id);
              existing.count++;
            } else {
              acc.push({
                emoji: reaction.emoji,
                users: [reaction.user_id],
                count: 1
              });
            }
            return acc;
          }, []) || []
        };
      }) || [];

      setMessages(prev => ({
        ...prev,
        [channelId]: processedMessages
      }));
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (channelId: string, content: string, threadId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          channel_id: channelId,
          user_id: user.id,
          content,
          thread_id: threadId || null
        });

      if (error) throw error;

      // Reload messages after sending
      await loadMessages(channelId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const addReaction = async (messageId: string, emoji: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reactions')
        .insert({
          message_id: messageId,
          user_id: user.id,
          emoji
        });

      if (error) throw error;

      // Reload messages to update reactions
      if (currentChannel) {
        await loadMessages(currentChannel.id);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const removeReaction = async (messageId: string, emoji: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reactions')
        .delete()
        .eq('message_id', messageId)
        .eq('user_id', user.id)
        .eq('emoji', emoji);

      if (error) throw error;

      // Reload messages to update reactions
      if (currentChannel) {
        await loadMessages(currentChannel.id);
      }
    } catch (error) {
      console.error('Error removing reaction:', error);
    }
  };

  const createChannel = async (workspaceId: string, name: string, description?: string, type: 'public' | 'private' = 'public') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('channels')
        .insert({
          workspace_id: workspaceId,
          name,
          description,
          type,
          created_by: user.id
        });

      if (error) throw error;

      // Reload channels
      await loadChannels(workspaceId);
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const joinWorkspace = async (workspaceId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: workspaceId,
          user_id: user.id,
          role: 'member'
        });

      if (error) throw error;

      // Reload workspaces
      await loadWorkspaces();
    } catch (error) {
      console.error('Error joining workspace:', error);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user || !currentChannel) return;

    const messagesSubscription = supabase
      .channel(`messages:${currentChannel.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${currentChannel.id}`
        },
        () => {
          loadMessages(currentChannel.id);
        }
      )
      .subscribe();

    const reactionsSubscription = supabase
      .channel(`reactions:${currentChannel.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions'
        },
        () => {
          loadMessages(currentChannel.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesSubscription);
      supabase.removeChannel(reactionsSubscription);
    };
  }, [user, currentChannel]);

  // Load workspaces when user changes
  useEffect(() => {
    if (user) {
      loadWorkspaces();
    } else {
      setWorkspaces([]);
      setChannels([]);
      setMessages({});
      setCurrentWorkspace(null);
      setCurrentChannel(null);
    }
  }, [user]);

  // Load channels when workspace changes
  useEffect(() => {
    if (currentWorkspace) {
      loadChannels(currentWorkspace.id);
    } else {
      setChannels([]);
      setCurrentChannel(null);
    }
  }, [currentWorkspace]);

  // Load messages when channel changes
  useEffect(() => {
    if (currentChannel) {
      loadMessages(currentChannel.id);
    }
  }, [currentChannel]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        channels,
        workspaces,
        currentWorkspace,
        currentChannel,
        sendMessage,
        addReaction,
        removeReaction,
        setCurrentWorkspace,
        setCurrentChannel,
        loadWorkspaces,
        loadChannels,
        loadMessages,
        createChannel,
        joinWorkspace
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
