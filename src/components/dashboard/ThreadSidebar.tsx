
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Hash, Reply, MoreHorizontal, Notebook } from 'lucide-react';
import { useMessages } from '@/contexts/MessageContext';
import MessageBubble from './MessageBubble';
import ThreadMessageInput from './ThreadMessageInput';
import { downloadMeetingNotes } from '@/utils/meetingNotesGenerator';

const ThreadSidebar: React.FC = () => {
  const { messages, selectedThread, setSelectedThread } = useMessages();
  const [inputText, setInputText] = useState('');
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputText === '' && selectedThread) {
        const threadSidebar = document.querySelector('.thread-sidebar');
        if (threadSidebar && !threadSidebar.contains(e.target as Node)) {
          setSelectedThread(null);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inputText, selectedThread, setSelectedThread]);

  if (!selectedThread) return null;

  const channelMessages = messages[selectedThread.channelId] || [];
  const parentMessage = channelMessages.find(msg => msg.id === selectedThread.messageId);

  if (!parentMessage) return null;

  return (
    <div className="w-full h-full bg-chat-dark border-l border-gray-700 flex flex-col thread-sidebar">
      {/* Thread Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-white font-medium flex items-center">
            <span>{selectedThread.channelId}</span>
          </div>
          <div className="mx-2 text-gray-500">&gt;</div>
          <div className="text-white font-medium flex items-center">
            <span>{parentMessage.username}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const threadMessages = [parentMessage, ...(parentMessage.replies || [])];
              downloadMeetingNotes(threadMessages, `Thread in ${selectedThread.channelId}`);
            }}
            className="h-8 p-1 text-gray-400 hover:text-white hover:bg-gray-700 flex items-center gap-1"
            title="Generate Meeting Notes"
          >
            <Notebook className="w-4 h-4" />
            <span className="text-xs">AI Notes</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedThread(null)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Thread Messages */}
      <div className="flex-1 overflow-hidden w-full">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent w-full">
          {/* Parent Message */}
          <div className="border-b border-gray-700 p-4 bg-chat-dark w-full">
            <MessageBubble message={parentMessage} showAvatar={true} isInThread={true} />
          </div>
          
          {/* Replies */}
          <div className="p-4 bg-chat-dark w-full">
            <div className="space-y-3 w-full">
              {parentMessage.replies && parentMessage.replies.map((reply) => (
                <div key={reply.id} className="w-full">
                  <MessageBubble
                    message={reply}
                    showAvatar={true}
                    isGrouped={false}
                    isInThread={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thread Input */}
      <div className="p-2 border-t border-gray-700 bg-chat-dark shadow-inner">
        <div className="border border-gray-600 rounded-md bg-gray-700 shadow-inner">
          <ThreadMessageInput
            channelId={selectedThread.channelId}
            placeholder={`Reply to ${parentMessage.username}...`}
            parentMessageId={selectedThread.messageId}
            channelName={selectedThread.channelId}
            onInputChange={setInputText}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreadSidebar;
