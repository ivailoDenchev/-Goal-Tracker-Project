import React from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiCheckCircle, FiPlus, FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';

const GoalsDashboard: React.FC = () => {
  const today = new Date();

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: 'var(--background-color)',
      padding: '0',
      overflowY: 'hidden',
      width: '100%',
      position: 'relative'
    }}>
      {/* Floating search bar */}
      <div style={{
        position: 'sticky',
        top: '15px',
        zIndex: 100,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '15px',
        marginTop: '15px',
        
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '8px 16px',
          width: '1500px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)'
        }}>
          <FiSearch size={16} color="#777" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Type to search..." 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-color)',
              outline: 'none',
              width: '100%',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      <div style={{ 
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'min-content min-content min-content auto',
        gap: '15px',
        height: 'calc(100vh - 80px)',
        padding: '0 100px 20px'
      }}>
        {/* Recents Section */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '8px',
          padding: '15px',
          color: 'var(--text-color)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            marginBottom: '10px'
          }}>Recents</h2>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TaskItem title="Task 2" project="Project 2" />
            <TaskItem title="Task 1" project="Project 2" />
            <TaskItem title="Task 3" project="Project 2" />
            <TaskItem title="Task 2" />
            <TaskItem title="Task 1" />
            <TaskItem title="Task 3" />
          </ul>
        </div>

        {/* Agenda Section */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '8px',
          padding: '15px',
          color: 'var(--text-color)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            marginBottom: '10px'
          }}>Agenda</h2>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{format(today, 'MMM d, EEE')}</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button style={navigationButtonStyle}><FiChevronLeft size={16} /></button>
                <button style={navigationButtonStyle}><FiChevronRight size={16} /></button>
              </div>
            </div>
            <button style={{ 
              backgroundColor: 'var(--primary-color)', 
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              padding: '4px 10px',
              borderRadius: '4px',
            }}>Today</button>
          </div>

          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px 0',
            flex: 1
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              marginBottom: '10px',
              opacity: 0.6
            }}>
              <FiCalendar size={40} color="#aaa" />
            </div>
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--light-text)', 
              textAlign: 'center',
              marginBottom: '5px'
            }}>
              Agenda items from your calendars will show here.
            </p>
            <a href="#" style={{ 
              fontSize: '13px', 
              color: 'var(--primary-color)', 
              textDecoration: 'underline'
            }}>
              Learn more
            </a>
          </div>

          <button style={addButtonStyle}>
            <FiPlus size={16} />
          </button>
        </div>

        {/* My Work Section */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '8px',
          padding: '15px',
          color: 'var(--text-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow)',
          height: '100%'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            marginBottom: '10px'
          }}>My Work</h2>

          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              width: '30px', 
              height: '30px', 
              marginBottom: '10px',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f7ff',
              borderRadius: '8px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 8L10 12L6 16M14 8L18 12L14 16" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--light-text)', 
              textAlign: 'center',
              marginBottom: '5px'
            }}>
              Tasks and Reminders assigned to you will show here.
            </p>
            <a href="#" style={{ 
              fontSize: '13px', 
              color: 'var(--primary-color)', 
              textDecoration: 'underline'
            }}>
              Learn more
            </a>
          </div>

          <button style={addButtonStyle}>
            <FiPlus size={16} />
          </button>
        </div>

        {/* Assigned to me Section */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '8px',
          padding: '15px',
          color: 'var(--text-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow)',
          height: '100%'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            marginBottom: '10px'
          }}>Assigned to me</h2>

          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              width: '30px', 
              height: '30px', 
              marginBottom: '10px',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f7ff',
              borderRadius: '8px'
            }}>
              <FiCheckCircle size={20} color="#aaa" />
            </div>
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--light-text)', 
              textAlign: 'center',
              marginBottom: '5px'
            }}>
              Tasks assigned to you will appear here.
            </p>
            <a href="#" style={{ 
              fontSize: '13px', 
              color: 'var(--primary-color)', 
              textDecoration: 'underline'
            }}>
              Learn more
            </a>
          </div>

          <button style={addButtonStyle}>
            <FiPlus size={16} />
          </button>
        </div>

        {/* Personal List Section */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '8px',
          padding: '15px',
          color: 'var(--text-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow)',
          height: '100%'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            Personal List 
            <span style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              backgroundColor: 'transparent',
              border: '1px solid var(--light-text)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: 'var(--light-text)'
            }}>i</span>
          </h2>

          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              width: '30px', 
              height: '30px', 
              marginBottom: '10px',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f7ff',
              borderRadius: '8px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7C6.44772 5 6 5.44772 6 6V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V6C18 5.44772 17.5523 5 17 5H15M9 5V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V5M9 5H15M12 11H15M12 15H15M9 11H9.01M9 15H9.01" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--light-text)', 
              textAlign: 'center',
              marginBottom: '5px'
            }}>
              Personal List is a home for your tasks.
            </p>
            <a href="#" style={{ 
              fontSize: '13px', 
              color: 'var(--primary-color)', 
              textDecoration: 'underline'
            }}>
              Learn more
            </a>
          </div>

          <button style={addButtonStyle}>
            <FiPlus size={16} />
          </button>
        </div>

        {/* Assigned comments Section */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '8px',
          padding: '15px',
          color: 'var(--text-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow)',
          height: '100%'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            marginBottom: '10px'
          }}>Assigned comments</h2>

          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              width: '30px', 
              height: '30px', 
              marginBottom: '10px',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f7ff',
              borderRadius: '8px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--light-text)', 
              textAlign: 'center',
              marginBottom: '5px',
              fontWeight: '500'
            }}>
              No Comments
            </p>
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--light-text)', 
              textAlign: 'center',
              marginBottom: '5px'
            }}>
              You don't have any assigned comments.
            </p>
            <a href="#" style={{ 
              fontSize: '13px', 
              color: 'var(--primary-color)', 
              textDecoration: 'underline'
            }}>
              Learn more
            </a>
          </div>
        </div>

        {/* AI StandUp Section */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '8px',
          padding: '15px',
          color: 'var(--text-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow)',
          gridColumn: 'span 2',
          height: '100%'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <span style={{ 
              width: '16px', 
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.5 3.5L7.5 2.5M8.5 5.5L7.5 6.5M10.5 3.5L11.5 2.5M10.5 5.5L11.5 6.5M9.5 7.5V8.5M8 12.5L6.5 14M11 12.5L12.5 14M7 9.5H12C12.5523 9.5 13 9.94772 13 10.5V12C13 12.5523 12.5523 13 12 13H7C6.44772 13 6 12.5523 6 12V10.5C6 9.94772 6.44772 9.5 7 9.5ZM4.5 6.5C4.5 7.05228 4.05228 7.5 3.5 7.5C2.94772 7.5 2.5 7.05228 2.5 6.5C2.5 5.94772 2.94772 5.5 3.5 5.5C4.05228 5.5 4.5 5.94772 4.5 6.5ZM4.5 3.5C4.5 4.05228 4.05228 4.5 3.5 4.5C2.94772 4.5 2.5 4.05228 2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5C4.05228 2.5 4.5 2.94772 4.5 3.5ZM4.5 9.5C4.5 10.0523 4.05228 10.5 3.5 10.5C2.94772 10.5 2.5 10.0523 2.5 9.5C2.5 8.94772 2.94772 8.5 3.5 8.5C4.05228 8.5 4.5 8.94772 4.5 9.5Z" stroke="var(--primary-color)" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            AI StandUp
          </h2>

          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px'
            }}>
              <div style={{ 
                width: '30px', 
                height: '30px', 
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f7ff',
                borderRadius: '8px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9.5 4L8.5 3M9.5 6L8.5 7M11.5 4L12.5 3M11.5 6L12.5 7M10.5 8V9M9 13L7.5 14.5M12 13L13.5 14.5M8 10H13C13.5523 10 14 10.4477 14 11V12.5C14 13.0523 13.5523 13.5 13 13.5H8C7.44772 13.5 7 13.0523 7 12.5V11C7 10.4477 7.44772 10 8 10ZM5.5 7C5.5 7.55228 5.05228 8 4.5 8C3.94772 8 3.5 7.55228 3.5 7C3.5 6.44772 3.94772 6 4.5 6C5.05228 6 5.5 6.44772 5.5 7ZM5.5 4C5.5 4.55228 5.05228 5 4.5 5C3.94772 5 3.5 4.55228 3.5 4C3.5 3.44772 3.94772 3 4.5 3C5.05228 3 5.5 3.44772 5.5 4ZM5.5 10C5.5 10.5523 5.05228 11 4.5 11C3.94772 11 3.5 10.5523 3.5 10C3.5 9.44772 3.94772 9 4.5 9C5.05228 9 5.5 9.44772 5.5 10Z" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div style={{
              flex: 1
            }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--light-text)', 
                marginBottom: '10px'
              }}>
                Use ClickUp AI to create a recurring summary of recent activity.
              </p>
            </div>
            <button style={{ 
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}>
              Write StandUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Task Item Component
const TaskItem: React.FC<{ title: string; project?: string }> = ({ title, project }) => {
  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      fontSize: '14px'
    }}>
      <FiCheckCircle size={16} color="#aaa" />
      <span>{title}</span>
      {project && (
        <span style={{ 
          fontSize: '12px',
          color: 'var(--light-text)',
          fontWeight: '400'
        }}> - in {project}</span>
      )}
    </li>
  );
};

// Common styles
const navigationButtonStyle = {
  backgroundColor: '#f5f7ff',
  border: 'none',
  borderRadius: '4px',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'var(--text-color)'
};

const addButtonStyle = {
  backgroundColor: 'var(--primary-color)',
  border: 'none',
  borderRadius: '4px',
  padding: '5px 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'white',
  width: '28px',
  height: '28px',
  alignSelf: 'center',
  marginTop: '10px'
};

export default GoalsDashboard; 