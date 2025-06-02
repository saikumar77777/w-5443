
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Hash, 
  Plus, 
  ChevronDown, 
  ChevronRight,
  Lock,
  User,
  LogOut,
  Settings,
  Users
} from 'lucide-react';
import { ExtendedUser, Workspace } from '@/contexts/AuthContext';

interface SidebarProps {
  user: ExtendedUser | null;
  workspace: Workspace | null;
  currentChannel: string;
  channels: any[];
  onChannelSelect: (channelId: string) => void;
  onProfileClick: () => void;
  onCreateChannel: () => void;
  onInviteTeammates: () => void;
  onLogout: () => void;
}

// Mock workspace data for testing
const mockWorkspaceData = {
  name: 'Demo Workspace',
  url: 'demo-workspace',
  icon: '👨‍💻',
  members: [
    { id: 'user1', name: 'John Doe' },
    { id: 'user2', name: 'Jane Smith' }
  ]
};

const Sidebar: React.FC<SidebarProps> = ({
  user,
  workspace,
  currentChannel,
  channels,
  onChannelSelect,
  onProfileClick,
  onCreateChannel,
  onInviteTeammates,
  onLogout
}) => {
  const [showChannels, setShowChannels] = useState(true);
  const [showDirectMessages, setShowDirectMessages] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Use workspace if available, otherwise fallback to mock data
  const workspaceData = workspace || mockWorkspaceData;

  const filteredChannels = channels.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Divide channels into regular and private
  const regularChannels = filteredChannels.filter(channel => !channel.isPrivate);
  const privateChannels = filteredChannels.filter(channel => channel.isPrivate);

  return (
    <div className="w-64 bg-slack-dark-aubergine text-white flex flex-col">
      {/* Workspace Selector */}
      <div className="p-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-slack-green rounded-md flex items-center justify-center mr-2 text-xs">
            {workspaceData.icon || workspaceData.name?.charAt(0)?.toUpperCase() || 'W'}
          </div>
          <h1 className="font-bold truncate">{workspaceData.name}</h1>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onProfileClick}
          className="text-white hover:bg-white/10 p-0 w-7 h-7 rounded-full"
        >
          <User className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search channels"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-md h-8 text-13"
          />
        </div>
      </div>

      {/* Channels Section */}
      <div className="flex-1 overflow-y-auto px-2">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-white/80 hover:bg-white/10 mb-1"
            onClick={() => setShowChannels(!showChannels)}
          >
            <span className="flex items-center">
              {showChannels ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              <span className="text-xs font-semibold">Channels</span>
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onCreateChannel();
                    }}
                    className="p-0 h-5 w-5 rounded-sm hover:bg-white/20"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">Add Channel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>

          {showChannels && (
            <div className="space-y-1 mb-4">
              {regularChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  onClick={() => onChannelSelect(channel.id)}
                  className={`w-full justify-start text-white hover:bg-white/10 h-7 text-sm font-normal py-0 ${
                    currentChannel === channel.id ? 'bg-white/20' : ''
                  }`}
                >
                  <div className="flex items-center overflow-hidden">
                    <Hash className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{channel.name}</span>
                    {channel.unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {channel.unreadCount}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>

        <div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-white/80 hover:bg-white/10 mb-1"
            onClick={() => setShowDirectMessages(!showDirectMessages)}
          >
            <span className="flex items-center">
              {showDirectMessages ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              <span className="text-xs font-semibold">Private Channels</span>
            </span>
          </Button>

          {showDirectMessages && (
            <div className="space-y-1">
              {privateChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  onClick={() => onChannelSelect(channel.id)}
                  className={`w-full justify-start text-white hover:bg-white/10 h-7 text-sm font-normal py-0 ${
                    currentChannel === channel.id ? 'bg-white/20' : ''
                  }`}
                >
                  <div className="flex items-center overflow-hidden">
                    <Lock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{channel.name}</span>
                    {channel.unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {channel.unreadCount}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="p-3 border-t border-white/10">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={onInviteTeammates}
            className="flex-1 bg-slack-green hover:bg-slack-green/90 text-white border-0 text-xs h-8"
          >
            <Users className="w-3 h-3 mr-1" /> Invite People
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="p-2 h-8 w-8 bg-white/10 hover:bg-white/20 rounded"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 bg-white/10 hover:bg-white/20 rounded"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
