import React from 'react';
import { GoalProvider } from './contexts/GoalContext';
import Dashboard from './pages/Dashboard';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <GoalProvider>
      <GlobalStyles />
      <Dashboard />
    </GoalProvider>
  )
}

export default App;
