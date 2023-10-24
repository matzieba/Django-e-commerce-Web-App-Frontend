import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from './contexts/AuthContext/AuthContext'
import { Root } from './pages/Root'
const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <Root />
        </AuthProvider>
      </QueryClientProvider>
  );
};

export default App;
