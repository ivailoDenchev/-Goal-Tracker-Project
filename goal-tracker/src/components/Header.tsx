import React from 'react';
import { HeaderContainer, Button } from '../styles/Layout';
import { FiSearch } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <HeaderContainer style={{ 
      backgroundColor: 'transparent', 
      boxShadow: 'none', 
      color: 'var(--white-text)',
      borderBottom: 'none',
      position: 'absolute',
      top: 0,
      left: '240px',
      right: 0,
      zIndex: 20,
      padding: '12px 20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          position: 'relative',
          width: '220px',
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
        <Button primary style={{ 
          border: 'none', 
          color: 'transparent',
          width: '30px',
          height: '30px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ 
            fontSize: '11px', 
            color: 'white', 
            backgroundColor: 'var(--primary-color)',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}>AI</span>
        </Button>
      </div>
    </HeaderContainer>
  );
};

export default Header; 