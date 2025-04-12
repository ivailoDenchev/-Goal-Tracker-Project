import React, { useState } from 'react';
import { GoalProvider } from './contexts/GoalContext';
import Dashboard from './pages/Dashboard';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <GoalProvider>
      <GlobalStyles />
      {isSearchOpen ? (
        <Header onClose={() => setIsSearchOpen(false)} />
      ) : (
        <Dashboard onToggleSearch={toggleSearch} />
      )}
    </GoalProvider>
  );
}

export default App;
