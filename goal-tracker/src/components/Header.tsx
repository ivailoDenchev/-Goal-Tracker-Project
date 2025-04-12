import React, { useState } from 'react';
import { HeaderContainer } from '../styles/Layout';
import { FiSearch, FiX } from 'react-icons/fi';

interface HeaderProps {
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <HeaderContainer style={{ 
      backgroundColor: 'var(--content-bg)',
      boxShadow: 'none', 
      color: 'var(--white-text)',
      borderBottom: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      padding: '30px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{ 
        position: 'relative',
        width: '450px',
        maxWidth: '90%',
        backgroundColor: 'white',
        borderRadius: '30px', 
        display: 'flex',
        alignItems: 'center',
        padding: '0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      }}>
        <button style={{ 
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}>
          <FiSearch color="#6e7ce0" size={22} />
        </button>
        <input
          type="text"
          placeholder="Type to search.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#666',
            width: '100%',
            fontSize: '16px',
            fontWeight: '500',
            padding: '18px 0',
          }}
          autoFocus
        />
        <button 
          onClick={() => {
            if (searchQuery) {
              setSearchQuery('');
            } else if (onClose) {
              onClose();
            }
          }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FiX color="#666" size={22} />
        </button>
      </div>
    </HeaderContainer>
  );
};

export default Header; 