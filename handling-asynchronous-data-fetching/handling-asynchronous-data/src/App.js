// App.js (Dengan Suspense dan Hooks)
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppWithSuspense from './AppWithSuspense';

// Buat instance QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>With Suspense and Hooks</h1>
      {/* Suspense hanya akan bekerja jika ada komponen di dalamnya */}
      <AppWithSuspense />
    </QueryClientProvider>
  );
};

export default App;
