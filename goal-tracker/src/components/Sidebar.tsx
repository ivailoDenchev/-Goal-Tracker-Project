import React from 'react';
import { SidebarContainer, LogoContainer, NavItem } from '../styles/Layout';
import { FiHome, FiInbox, FiTarget, FiPlus, FiMoreHorizontal, FiCalendar } from 'react-icons/fi';

interface SidebarProps {
  onTabChange: (tab: string) => void;
  activeTab?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabChange, activeTab = 'goals' }) => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <span style={{ 
          fontWeight: 500, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontSize: '14px'
        }}>
          <span style={{ 
            backgroundColor: '#f0f0f0', 
            borderRadius: '4px', 
            padding: '2px 6px',
            marginRight: '4px'
          }}>
            Acme, Inc.
          </span>
          ▼
        </span>
      </LogoContainer>
      
      <nav style={{ marginTop: '20px' }}>
        <ul>
          <NavItem active={activeTab === 'home'} onClick={() => onTabChange('home')}>
            <FiHome size={18} />
            <span>Home</span>
          </NavItem>
          <NavItem active={activeTab === 'inbox'} onClick={() => onTabChange('inbox')}>
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
            }}>9</span>
          </NavItem>
          
          <NavItem active={activeTab === 'goals'} onClick={() => onTabChange('goals')}>
            <FiTarget size={18} />
            <span>Goals</span>
          </NavItem>
          
          <NavItem active={activeTab === 'calendar'} onClick={() => onTabChange('calendar')}>
            <FiCalendar size={18} />
            <span>Calendar</span>
          </NavItem>
          
          <NavItem active={activeTab === 'more'} onClick={() => onTabChange('more')}>
            <FiMoreHorizontal size={18} />
            <span>More</span>
          </NavItem>
        </ul>
      </nav>
      
      <div style={{ marginTop: '40px', padding: '0 15px' }}>
        <div style={{ 
          fontSize: '13px', 
          color: 'var(--light-text)', 
          marginBottom: '10px', 
          fontWeight: '500' 
        }}>
          Spaces
        </div>
        <ul>
          <NavItem active={false}>
            <span style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '4px', 
              backgroundColor: '#7b68ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>M</span>
            <span>Marketing</span>
          </NavItem>
          <NavItem active={false}>
            <span style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '4px', 
              backgroundColor: '#ff6b6b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>P</span>
            <span>Product</span>
          </NavItem>
          <NavItem active={false}>
            <span style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '4px', 
              backgroundColor: '#ffa94d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>E</span>
            <span>Engineering</span>
          </NavItem>
          <NavItem active={false}>
            <span style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '4px', 
              backgroundColor: '#4dabf7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>D</span>
            <span>Design</span>
          </NavItem>
          <NavItem active={false}>
            <span style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '4px', 
              backgroundColor: '#36b9cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>F</span>
            <span>Finance</span>
          </NavItem>
          <NavItem active={false}>
            <span style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '4px', 
              backgroundColor: '#f06595',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>H</span>
            <span>HR</span>
          </NavItem>
          <NavItem active={false}>
            <FiPlus size={18} />
            <span>Add Space</span>
          </NavItem>
        </ul>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar; 