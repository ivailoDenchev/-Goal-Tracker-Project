import React from 'react';
import { ProgressBar, Avatar } from '../styles/Layout';
import { Target } from '../types';

interface TargetCardProps {
  target: Target;
}

const TargetCard: React.FC<TargetCardProps> = ({ target }) => {
  const { title, progress, assignee } = target;
  
  const getFormattedDate = () => {
    if (title === "Finalize campaign brief") return "10 minutes ago";
    if (title === "Audience & market research") return "1 day ago";
    if (title === "Confirm budgets") return "2 days ago";
    if (title === "Draft campaign messaging & copy") return "2 days ago";
    return "";
  };

  const getProgressColor = () => {
    if (title === "Draft campaign messaging & copy") return "#4CAF50";
    return "#7e57dc";
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ width: '34px', height: '34px', flexShrink: 0 }}>
        <Avatar 
          src={assignee?.avatar || ''} 
          style={{ 
            width: '34px', 
            height: '34px', 
            fontSize: '14px',
            backgroundColor: !assignee?.avatar ? 'var(--primary-color)' : undefined
          }}
        >
          {!assignee?.avatar && assignee?.name ? assignee.name.charAt(0).toUpperCase() : ''}
        </Avatar>
      </div>
      
      <div style={{ flex: 1 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '10px',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 500 }}>{title}</div>
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--light-text)'
          }}>
            {getFormattedDate()}
          </div>
        </div>
        
        <ProgressBar 
          progress={progress} 
          color={getProgressColor()} 
          style={{ height: '6px' }} 
        />
      </div>
    </div>
  );
};

export default TargetCard; 