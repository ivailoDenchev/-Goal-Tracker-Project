import React, { useState } from 'react';
import { AppContainer, MainContainer } from '../styles/Layout';
import Sidebar from '../components/Sidebar';
import GoalDetail from '../components/GoalDetail';
import GoalsDashboard from '../components/GoalsDashboard';
import InboxDashboard from '../components/InboxDashboard';
import CalendarView from '../components/CalendarView';
import CreateGoalView from '../components/CreateGoalView';
import { FiSearch } from 'react-icons/fi';

interface DashboardProps {
  onToggleSearch: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onToggleSearch }) => {
  const [activeTab, setActiveTab] = useState<string>('goals');

  return (
    <AppContainer>
      <Sidebar onTabChange={(tab) => setActiveTab(tab)} activeTab={activeTab} />
      <MainContainer style={{ 
        position: 'relative', 
        overflow: 'hidden',
        padding: activeTab === 'goals' || activeTab === 'inbox' || activeTab === 'calendar' ? '0' : undefined,
        width: '100%',
        maxHeight: '100vh',
        display: 'flex'
      }}>
        {activeTab !== 'goals' && activeTab !== 'inbox' && activeTab !== 'calendar' && (
          <div 
            style={{ 
              position: 'absolute',
              top: '20px', 
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              cursor: 'pointer'
            }}
            onClick={onToggleSearch}
          >
            <div style={{ 
              backgroundColor: 'white',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '25px',
              boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)',
              minWidth: '200px',
            }}>
              <FiSearch size={18} color="#777" style={{ marginRight: '10px' }} />
              <span style={{ color: '#777', fontSize: '14px', fontWeight: '500' }}>Type to search..</span>
            </div>
          </div>
        )}
        <div style={{ flex: 1, display: 'flex' }}>
          {activeTab === 'goals' ? (
            <GoalsDashboard />
          ) : activeTab === 'inbox' ? (
            <InboxDashboard />
          ) : activeTab === 'calendar' ? (
            <CalendarView />
          ) : (
            <GoalDetail />
          )}
        </div>
      </MainContainer>
    </AppContainer>
  );
};

export default Dashboard; 