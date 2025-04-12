import React from 'react';
import { useGoals } from '../contexts/GoalContext';
import { SidebarContainer, LogoContainer, NavItem } from '../styles/Layout';
import { FiHome, FiInbox, FiTarget, FiPlus } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const { goals, activeGoal, setActiveGoal } = useGoals();

  return (
    <SidebarContainer>
      <LogoContainer>
        <FiTarget size={20} color="var(--primary-color)" />
        <span>Goal Tracker</span>
      </LogoContainer>
      
      <nav>
        <ul>
          <NavItem active>
            <FiHome size={18} />
            <span>Home</span>
          </NavItem>
          <NavItem>
            <FiInbox size={18} />
            <span>Inbox</span>
            <span style={{ 
              marginLeft: 'auto', 
              background: 'var(--primary-color)', 
              color: 'white', 
              borderRadius: '50%', 
              width: '20px', 
              height: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '12px'
            }}>8</span>
          </NavItem>
          
          <div style={{ padding: '10px 15px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', color: 'var(--light-text)' }}>Goals</span>
              <FiPlus size={16} color="var(--light-text)" style={{ cursor: 'pointer' }} />
            </div>
            {goals.map(goal => (
              <NavItem 
                key={goal.id} 
                active={activeGoal?.id === goal.id}
                onClick={() => setActiveGoal(goal)}
              >
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--primary-color)',
                  marginRight: '5px'
                }} />
                <span>{goal.title}</span>
              </NavItem>
            ))}
          </div>
        </ul>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar; 