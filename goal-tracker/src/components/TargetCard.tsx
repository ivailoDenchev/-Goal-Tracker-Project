import React from 'react';
import { Card, ProgressBar, Avatar } from '../styles/Layout';
import { Target } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface TargetCardProps {
  target: Target;
}

const TargetCard: React.FC<TargetCardProps> = ({ target }) => {
  const { title, progress, dueDate, assignee } = target;
  
  const getFormattedDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
        <h4 style={{ fontWeight: 500 }}>{title}</h4>
        {assignee && (
          <Avatar src={assignee.avatar}>
            {!assignee.avatar && getInitials(assignee.name)}
          </Avatar>
        )}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <ProgressBar progress={progress} />
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '12px', 
        color: 'var(--light-text)'
      }}>
        <div>{progress}% completed</div>
        {dueDate && <div>{getFormattedDate(dueDate)}</div>}
      </div>
    </Card>
  );
};

export default TargetCard; 