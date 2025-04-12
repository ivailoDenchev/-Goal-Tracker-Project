import React from 'react';
import { HeaderContainer, Button, Avatar } from '../styles/Layout';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useGoals } from '../contexts/GoalContext';

const Header: React.FC = () => {
  const { activeGoal } = useGoals();

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          position: 'relative',
          width: '250px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px', 
          display: 'flex',
          alignItems: 'center',
          padding: '6px 12px',
        }}>
          <FiSearch color="white" size={16} style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              width: '100%',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button primary>
          <FiPlus size={16} style={{ marginRight: '4px' }} />
          New
        </Button>
        <div style={{ 
          width: '38px', 
          height: '38px', 
          borderRadius: '50%', 
          overflow: 'hidden',
          border: '2px solid white'
        }}>
          <Avatar>JD</Avatar>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header; 