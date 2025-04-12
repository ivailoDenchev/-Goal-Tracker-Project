import React from 'react';
import { AppContainer, MainContainer, ContentContainer } from '../styles/Layout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import GoalDetail from '../components/GoalDetail';

const Dashboard: React.FC = () => {
  return (
    <AppContainer>
      <Sidebar />
      <MainContainer>
        <Header />
        <ContentContainer>
          <GoalDetail />
        </ContentContainer>
      </MainContainer>
    </AppContainer>
  );
};

export default Dashboard; 