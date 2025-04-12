import React from 'react';
import { AppContainer, MainContainer } from '../styles/Layout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import GoalDetail from '../components/GoalDetail';

const Dashboard: React.FC = () => {
  return (
    <AppContainer>
      <Sidebar />
      <MainContainer style={{ position: 'relative', overflow: 'hidden' }}>
        <Header />
        <GoalDetail />
      </MainContainer>
    </AppContainer>
  );
};

export default Dashboard; 