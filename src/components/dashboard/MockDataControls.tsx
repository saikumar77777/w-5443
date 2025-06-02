import React from 'react';
import { Button } from '@/components/ui/button';
import { addMockRepliesToGeneralChannel, addNewThreadWithManyReplies } from '@/utils/addMockReplies';
import { toast } from '@/components/ui/use-toast';

const MockDataControls: React.FC = () => {
  const handleAddReplies = () => {
    const result = addMockRepliesToGeneralChannel();
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleAddNewThread = () => {
    const result = addNewThreadWithManyReplies();
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button 
        onClick={handleAddReplies}
        className="bg-purple-600 hover:bg-purple-700 text-white"
        size="sm"
      >
        Add Mock Replies
      </Button>
      <Button 
        onClick={handleAddNewThread}
        className="bg-purple-600 hover:bg-purple-700 text-white"
        size="sm"
      >
        Add New Thread
      </Button>
    </div>
  );
};

export default MockDataControls;
