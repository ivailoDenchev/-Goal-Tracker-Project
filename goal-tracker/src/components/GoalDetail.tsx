import React from 'react';
import { Button } from '../styles/Layout';
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
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      {/* Blue header section */}
      <div style={{ 
        backgroundColor: 'var(--content-bg)',
        padding: '50px 0 40px',
        height: '180px',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          paddingLeft: '1150px',
          paddingRight: '30px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              position: 'relative',
              width: '80px',
              height: '80px',
              marginRight: '20px'
            }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle 
                  cx="40" 
                  cy="40" 
                  r="36" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.2)" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="36" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 36 * activeGoal.progress / 100} ${2 * Math.PI * 36 * (100 - activeGoal.progress) / 100}`}
                  strokeDashoffset={2 * Math.PI * 36 * 0.25}
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff'
              }}>
                {activeGoal.progress}%
              </div>
            </div>
            <h1 style={{ fontWeight: '500', fontSize: '24px', color: 'white' }}>{activeGoal.title}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button primary style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 10px',
              fontSize: '12px'
            }}>
              <FiShare2 size={14} />
              <span>SHARE</span>
            </Button>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              overflow: 'hidden',
              border: '2px solid white'
            }}>
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Light background area - full width */}
      <div style={{
        backgroundColor: '#f0f4ff',
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        {/* Content container for centered card */}
        <div style={{
          width: '620px',
          transform: 'translateY(-30px)',
        }}>
          {/* White card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            padding: '25px 30px'
          }}>
            <h3 style={{ 
              marginBottom: '25px', 
              fontWeight: '500',
              fontSize: '16px'
            }}>Targets</h3>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {activeGoal.targets.map(target => (
                <TargetCard key={target.id} target={target} />
              ))}
            </div>

            {activeGoal.timeline && activeGoal.timeline.length > 0 && (
              <>
                <h3 style={{ 
                  marginBottom: '20px', 
                  marginTop: '40px', 
                  fontWeight: '500',
                  fontSize: '16px'
                }}>Timeline</h3>
                <div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {activeGoal.timeline.map(item => (
                      <li key={item.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ 
                            display: 'inline-block',
                            padding: '2px 5px',
                            backgroundColor: 'var(--success-color)',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>2.5</span>
                          <span style={{ fontWeight: '500' }}>{item.title}</span>
                        </div>
                        <div style={{ 
                          fontSize: '14px',
                          color: 'var(--light-text)'
                        }}>
                          {item.id === 't1-1' && '10/3 by Emily'}
                          {item.id === 't1-2' && '21/7 by Mark'}
                          {item.id === 't1-3' && '17/3 by Zac'}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail; 