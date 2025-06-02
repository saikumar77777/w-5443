
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Building } from 'lucide-react';

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

const WorkspacesPage = () => {
  const { user, setCurrentWorkspace } = useAuth();
  const [workspaceName, setWorkspaceName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return;
    
    setIsCreating(true);
    try {
      // TODO: Implement actual workspace creation
      console.log('Creating workspace:', workspaceName);
      
      // For now, use mock data
      setCurrentWorkspace({
        id: 'new-workspace',
        name: workspaceName,
        slug: workspaceName.toLowerCase().replace(/\s+/g, '-'),
        description: '',
        logo_url: '',
        owner_id: user?.id || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        url: workspaceName.toLowerCase().replace(/\s+/g, '-'),
        icon: workspaceName.charAt(0).toUpperCase()
      });
    } catch (error) {
      console.error('Error creating workspace:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinWorkspace = (workspace: any) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Workspaces
          </h1>
          <p className="text-gray-600">
            Create a new workspace or join an existing one to get started
          </p>
        </div>

        {/* Create Workspace */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create a New Workspace
            </CardTitle>
            <CardDescription>
              Start collaborating with your team in a new workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter workspace name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleCreateWorkspace}
                disabled={!workspaceName.trim() || isCreating}
              >
                {isCreating ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Workspaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {mockWorkspaceData.icon}
                </div>
                {mockWorkspaceData.name}
              </CardTitle>
              <CardDescription>
                Demo workspace for testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {mockWorkspaceData.members.length} members
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleJoinWorkspace({
                    id: 'demo-workspace',
                    name: mockWorkspaceData.name,
                    slug: mockWorkspaceData.url,
                    description: 'Demo workspace for testing',
                    logo_url: '',
                    owner_id: 'demo-user',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    url: mockWorkspaceData.url,
                    icon: mockWorkspaceData.icon
                  })}
                >
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkspacesPage;
