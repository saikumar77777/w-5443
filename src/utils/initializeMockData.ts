import { addTechChannelMockData } from './addTechChannelMockData';

// Function to initialize all mock data
export const initializeMockData = () => {
  // Add mock threads to tech channel
  const techResult = addTechChannelMockData();
  
  if (techResult.success) {
    console.log('Successfully initialized mock data for Tech channel');
  } else {
    console.warn('Failed to initialize mock data for Tech channel:', techResult.message);
  }
  
  return {
    success: true,
    message: 'Mock data initialization complete'
  };
};
