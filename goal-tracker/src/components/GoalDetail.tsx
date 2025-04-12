import React from 'react';
import { Card, ProgressBar, Button } from '../styles/Layout';
import { useGoals } from '../contexts/GoalContext';
import TargetCard from './TargetCard';
import { FiShare2 } from 'react-icons/fi';

const GoalDetail: React.FC = () => {
  const { activeGoal } = useGoals();

  if (!activeGoal) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h3>No goal selected</h3>
        <p>Please select a goal from the sidebar</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{ marginBottom: '10px' }}>{activeGoal.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{ 
                position: 'relative', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow)'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{activeGoal.progress}%</span>
              <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                borderWidth: '4px',
                borderStyle: 'solid',
                borderColor: `var(--primary-color) ${100 - activeGoal.progress}%`,
                transform: 'rotate(-90deg)',
                boxSizing: 'border-box'
              }}></div>
            </div>
            <span>Completed</span>
          </div>
        </div>
        <Button primary>
          <FiShare2 size={16} style={{ marginRight: '4px' }} />
          Share
        </Button>
      </div>

      <h3 style={{ marginBottom: '15px' }}>Targets</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {activeGoal.targets.map(target => (
          <TargetCard key={target.id} target={target} />
        ))}
      </div>

      {activeGoal.timeline && activeGoal.timeline.length > 0 && (
        <>
          <h3 style={{ marginBottom: '15px' }}>Timeline</h3>
          <Card>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {activeGoal.timeline.map(item => (
                <li key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%',
                    border: '2px solid var(--primary-color)',
                    marginTop: '3px'
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '3px'
                    }}>
                      <span style={{ fontWeight: '500' }}>{item.title}</span>
                      {item.assignee && (
                        <span style={{ color: 'var(--light-text)', fontSize: '14px' }}>
                          by {item.assignee.name}
                        </span>
                      )}
                    </div>
                    {item.dueDate && (
                      <span style={{ color: 'var(--light-text)', fontSize: '14px' }}>
                        Due {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
};

export default GoalDetail; 