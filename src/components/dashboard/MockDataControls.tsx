
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useMessages } from '@/contexts/MessageContext';
import { toast } from 'sonner';

export const MockDataControls: React.FC = () => {
  const { user } = useAuth();
  const { loadWorkspaces, loadChannels, currentWorkspace } = useMessages();

  const createSampleWorkspace = async () => {
    if (!user) return;

    try {
      // Create workspace
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .insert({
          name: 'Sample Workspace',
          slug: 'sample-workspace',
          description: 'A sample workspace for testing',
          owner_id: user.id
        })
        .select()
        .single();

      if (workspaceError) throw workspaceError;

      // Add user as workspace member
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: workspace.id,
          user_id: user.id,
          role: 'owner'
        });

      if (memberError) throw memberError;

      // Create sample channels
      const channels = [
        { name: 'general', description: 'General discussion' },
        { name: 'random', description: 'Random conversations' },
        { name: 'tech', description: 'Technical discussions' }
      ];

      for (const channel of channels) {
        const { error: channelError } = await supabase
          .from('channels')
          .insert({
            workspace_id: workspace.id,
            name: channel.name,
            description: channel.description,
            type: 'public',
            created_by: user.id
          });

        if (channelError) throw channelError;
      }

      await loadWorkspaces();
      toast.success('Sample workspace created successfully!');
    } catch (error) {
      console.error('Error creating sample workspace:', error);
      toast.error('Failed to create sample workspace');
    }
  };

  const clearAllData = async () => {
    if (!user) return;

    try {
      // Delete workspace members (this will cascade delete workspaces due to RLS)
      const { error } = await supabase
        .from('workspace_members')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      await loadWorkspaces();
      toast.success('All data cleared successfully!');
    } catch (error) {
      console.error('Error clearing data:', error);
      toast.error('Failed to clear data');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Database Controls</CardTitle>
        <CardDescription>
          Manage your workspace data directly from the database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={createSampleWorkspace} 
          className="w-full"
          variant="default"
        >
          Create Sample Workspace
        </Button>
        
        <Button 
          onClick={clearAllData} 
          className="w-full"
          variant="destructive"
        >
          Clear All Data
        </Button>
        
        <div className="text-sm text-muted-foreground">
          <p>Sample workspace includes:</p>
          <ul className="list-disc list-inside mt-1">
            <li>#general channel</li>
            <li>#random channel</li>
            <li>#tech channel</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
