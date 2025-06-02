
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import WorkspacesPage from './WorkspacesPage';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

type AuthStep = 'login' | 'signup';

const Index: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [showWorkspaces, setShowWorkspaces] = useState(() => {
    // Check if workspace is selected from localStorage
    return localStorage.getItem('workspace_selected') === 'true';
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slack-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slack-aubergine rounded-slack-xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-slack-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // After authentication, check if workspace is selected
  if (isAuthenticated) {
    // Check if workspace is selected from localStorage
    const workspaceSelected = localStorage.getItem('workspace_selected') === 'true';
    
    // If workspace is selected, show dashboard
    if (workspaceSelected) {
      return <DashboardLayout />;
    } else {
      // Otherwise show workspaces page
      return <WorkspacesPage />;
    }
  }
  
  // Check if there's a stored user but not authenticated yet
  // This handles the case where a user has logged in before but the session isn't active
  const storedUser = localStorage.getItem('slack_user');
  if (storedUser && !isAuthenticated && !isLoading) {
    // Show workspaces page without requiring re-authentication
    return <WorkspacesPage />;
  }

  const handleSwitchToSignUp = () => {
    setAuthStep('signup');
  };

  const handleSwitchToLogin = () => {
    setAuthStep('login');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password flow');
    // Implement forgot password flow
  };

  // Show authentication forms for non-authenticated users
  switch (authStep) {
    case 'login':
      return (
        <LoginForm
          workspaceUrl=""
          onBack={() => {}} // Not needed in new flow
          onForgotPassword={handleForgotPassword}
          onSignUp={handleSwitchToSignUp}
        />
      );

    case 'signup':
      return (
        <SignUpForm
          onBack={handleSwitchToLogin}
          onSignIn={handleSwitchToLogin}
          isCreatingWorkspace={false}
        />
      );

    default:
      return (
        <LoginForm
          workspaceUrl=""
          onBack={() => {}}
          onForgotPassword={handleForgotPassword}
          onSignUp={handleSwitchToSignUp}
        />
      );
  }
};

export default Index;
