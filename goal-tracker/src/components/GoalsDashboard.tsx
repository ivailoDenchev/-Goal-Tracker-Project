import React, { useState } from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiCheckCircle, FiCircle, FiPlus, FiSearch, FiX, FiUsers, FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { format, addDays } from 'date-fns';
import Calendar from './Calendar';
import { useGoals } from '../contexts/GoalContext';
import { PersonalList as PersonalListType, ListTask } from '../types';

const GoalsDashboard: React.FC = () => {
  const today = new Date();
  const { 
    goals, 
    getTasksForDate, 
    addTarget, 
    recentGoals, 
    updateTarget,
    personalLists,
    addPersonalList,
    updatePersonalList,
    deletePersonalList,
    addListTask,
    updateListTask,
    deleteListTask
  } = useGoals();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<string | null>(goals.length > 0 ? goals[0].id : null);
  
  // Personal List state
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [newListColor, setNewListColor] = useState('#4f6bed');
  const [showAddPersonalTaskModal, setShowAddPersonalTaskModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [activeListId, setActiveListId] = useState<string | null>(personalLists[0]?.id || null);
  
  // Colors for new lists
  const colorOptions = [
    '#4f6bed', // Blue
    '#65cd91', // Green
    '#f44336', // Red
    '#ff9800', // Orange
    '#9c27b0', // Purple
    '#00bcd4', // Cyan
  ];

  // Handle adding a new personal list
  const handleAddList = () => {
    if (newListTitle.trim()) {
      addPersonalList(newListTitle, newListColor);
      setNewListTitle('');
      setShowAddListModal(false);
    }
  };

  // Handle adding a new task to a personal list
  const handleAddPersonalTask = () => {
    if (newTaskTitle.trim() && selectedListId) {
      addListTask(selectedListId, {
        title: newTaskTitle,
        completed: false,
        priority: newTaskPriority
      });
      setNewTaskTitle('');
      setShowAddPersonalTaskModal(false);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (listId: string, task: ListTask) => {
    updateListTask(listId, { ...task, completed: !task.completed });
  };

  // Handle clicking on a recent goal
  const handleRecentGoalClick = (goalId: string, target: any) => {
    updateTarget(goalId, { ...target, completed: !target.completed });
  };

  // Handle adding a task
  const handleAddTask = () => {
    if (taskTitle.trim() && selectedGoal) {
      addTarget(selectedGoal, {
        title: taskTitle,
        completed: false,
        dueDate: selectedDate.toISOString(),
        progress: 0
      });
      
      // Reset and close modal
      setTaskTitle('');
      setShowAddTaskModal(false);
    }
  };

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
            {recentGoals.length > 0 ? (
              recentGoals.map((goal, index) => (
                <TaskItem 
                  key={index} 
                  title={goal.target.title} 
                  project={goal.goalTitle}
                  completed={goal.target.completed}
                  onClick={() => handleRecentGoalClick(goal.goalId, goal.target)}
                />
              ))
            ) : (
              <>
                <TaskItem title="Task 2" project="Project 2" />
                <TaskItem title="Task 1" project="Project 2" />
                <TaskItem title="Task 3" project="Project 2" />
                <TaskItem title="Task 2" />
                <TaskItem title="Task 1" />
                <TaskItem title="Task 3" />
              </>
            )}
          </ul>
        </div>

        {/* Agenda Section with Calendar */}
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
          }}>Create Goal</h2>

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
          </div>

          {/* Today's Tasks */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {(() => {
              const todayTasks = getTasksForDate(today);
              
              if (todayTasks.length === 0) {
                return (
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
                      No goals scheduled for today.
                    </p>
                    <a href="#" style={{ 
                      fontSize: '13px', 
                      color: 'var(--primary-color)', 
                      textDecoration: 'underline'
                    }}>
                      View Calendar
                    </a>
                  </div>
                );
              }
              
              return (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {todayTasks.map((task, index) => (
                    <li key={index} style={{
                      padding: '8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--hover-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {task.target.completed ? (
                        <FiCheckCircle size={16} color="var(--success-color)" />
                      ) : (
                        <FiCheckCircle size={16} color="var(--light-text)" />
                      )}
                      <div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {task.target.title}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: 'var(--light-text)'
                        }}>
                          {task.goalTitle}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              );
            })()}
          </div>

          <button 
            style={addButtonStyle}
            onClick={() => setShowAddTaskModal(true)}
          >
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
          height: '100%',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              Personal Lists
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
            <button 
              style={{
                backgroundColor: 'transparent',
                color: 'var(--primary-color)',
                border: 'none',
                borderRadius: '4px',
                padding: '5px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setShowAddListModal(true)}
            >
              <FiPlus size={14} />
            </button>
          </div>

          {personalLists.length > 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* List tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', overflowX: 'auto', paddingBottom: '5px' }}>
                {personalLists.map(list => (
                  <button
                    key={list.id}
                    onClick={() => setActiveListId(list.id)}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: activeListId === list.id ? list.color : 'transparent',
                      color: activeListId === list.id ? 'white' : 'var(--text-color)',
                      fontSize: '12px',
                      fontWeight: activeListId === list.id ? '500' : '400',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      position: 'relative'
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: list.color,
                        display: activeListId === list.id ? 'none' : 'inline-block',
                        marginRight: '6px'
                      }}
                    />
                    {list.title}
                  </button>
                ))}
              </div>

              {/* Tasks for the active list */}
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                {activeListId && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '500' }}>
                        {personalLists.find(list => list.id === activeListId)?.title}
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedListId(activeListId);
                          setShowAddPersonalTaskModal(true);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: 'var(--primary-color)'
                        }}
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {personalLists
                        .find(list => list.id === activeListId)?.tasks
                        .map(task => (
                          <li
                            key={task.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px',
                              borderRadius: '4px',
                              backgroundColor: 'var(--hover-bg)',
                              gap: '10px'
                            }}
                          >
                            <div 
                              onClick={() => toggleTaskCompletion(activeListId, task)}
                              style={{ cursor: 'pointer' }}
                            >
                              {task.completed ? (
                                <FiCheckCircle size={16} color="var(--success-color)" />
                              ) : (
                                <FiCircle size={16} color="var(--light-text)" />
                              )}
                            </div>
                            <div style={{ 
                              flex: 1,
                              fontSize: '14px',
                              textDecoration: task.completed ? 'line-through' : 'none',
                              color: task.completed ? 'var(--light-text)' : 'var(--text-color)'
                            }}>
                              {task.title}
                            </div>
                            {task.priority && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: 
                                  task.priority === 'high' ? '#f44336' : 
                                  task.priority === 'medium' ? '#ff9800' : 
                                  '#65cd91'
                              }} />
                            )}
                            <button
                              onClick={() => deleteListTask(activeListId, task.id)}
                              style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--light-text)',
                                padding: '2px'
                              }}
                            >
                              <FiTrash2 size={12} />
                            </button>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ) : (
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
                Create your first personal list
              </p>
              <button
                onClick={() => setShowAddListModal(true)}
                style={{ 
                  fontSize: '13px', 
                  color: 'var(--primary-color)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Add a list
              </button>
            </div>
          )}
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

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500' }}>Create New Goal</h3>
              <button 
                onClick={() => setShowAddTaskModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--light-text)'
                }}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label 
                htmlFor="taskTitle" 
                style={{ 
                  display: 'block', 
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: 'var(--light-text)'
                }}
              >
                Goal Title
              </label>
              <input
                id="taskTitle"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  fontSize: '14px'
                }}
                placeholder="Enter goal title"
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label
                htmlFor="goalSelect"
                style={{ 
                  display: 'block', 
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: 'var(--light-text)'
                }}
              >
                Parent Goal
              </label>
              <select
                id="goalSelect"
                value={selectedGoal || ''}
                onChange={(e) => setSelectedGoal(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                {goals.map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{ 
                  display: 'block', 
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: 'var(--light-text)'
                }}
              >
                Due Date
              </label>
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: selectedDate.toDateString() === new Date().toDateString() ? 'var(--light-primary-color)' : 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: selectedDate.toDateString() === new Date().toDateString() ? 'var(--primary-color)' : 'var(--text-color)',
                    fontWeight: selectedDate.toDateString() === new Date().toDateString() ? '500' : '400'
                  }}
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedDate(addDays(new Date(), 1))}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: selectedDate.toDateString() === addDays(new Date(), 1).toDateString() ? 'var(--light-primary-color)' : 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: selectedDate.toDateString() === addDays(new Date(), 1).toDateString() ? 'var(--primary-color)' : 'var(--text-color)',
                    fontWeight: selectedDate.toDateString() === addDays(new Date(), 1).toDateString() ? '500' : '400'
                  }}
                >
                  Tomorrow
                </button>
                <input
                  type="date"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    fontSize: '14px',
                    flex: 1
                  }}
                />
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>
              <button
                onClick={() => setShowAddTaskModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Personal List Modal */}
      {showAddListModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500' }}>Create New List</h3>
              <button 
                onClick={() => setShowAddListModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--light-text)'
                }}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label 
                htmlFor="listTitle" 
                style={{ 
                  display: 'block', 
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: 'var(--primary-color)'
                }}
              >
                List Title
              </label>
              <input
                id="listTitle"
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--primary-color)',
                  fontSize: '14px',
                  backgroundColor: 'var(--light-primary-color)'
                }}
                placeholder="Enter list title"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{ 
                  display: 'block', 
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: 'var(--primary-color)'
                }}
              >
                List Color
              </label>
              <div style={{ 
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                {colorOptions.map(color => (
                  <div
                    key={color}
                    onClick={() => setNewListColor(color)}
                    style={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '4px',
                      backgroundColor: color,
                      cursor: 'pointer',
                      border: newListColor === color ? '2px solid #333' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>
              <button
                onClick={() => setShowAddListModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddList}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Personal Task Modal */}
      {showAddPersonalTaskModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500' }}>Add Task to List</h3>
              <button 
                onClick={() => setShowAddPersonalTaskModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--light-text)'
                }}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label 
                htmlFor="taskTitle" 
                style={{ 
                  display: 'block', 
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: 'var(--primary-color)'
                }}
              >
                Task Title
              </label>
              <input
                id="taskTitle"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--primary-color)',
                  fontSize: '14px',
                  backgroundColor: 'var(--light-primary-color)'
                }}
                placeholder="Enter task title"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="taskPriority"
                style={{ 
                  display: 'block', 
                  marginBottom: '5px',
                  fontSize: '14px',
                  color: 'var(--primary-color)'
                }}
              >
                Priority
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setNewTaskPriority('low')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: newTaskPriority === 'low' ? '#e8f5e9' : 'white',
                    color: newTaskPriority === 'low' ? '#2e7d32' : 'var(--text-color)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Low
                </button>
                <button
                  onClick={() => setNewTaskPriority('medium')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: newTaskPriority === 'medium' ? '#fff3e0' : 'white',
                    color: newTaskPriority === 'medium' ? '#e65100' : 'var(--text-color)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Medium
                </button>
                <button
                  onClick={() => setNewTaskPriority('high')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: newTaskPriority === 'high' ? '#ffebee' : 'white',
                    color: newTaskPriority === 'high' ? '#c62828' : 'var(--text-color)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  High
                </button>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>
              <button
                onClick={() => setShowAddPersonalTaskModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddPersonalTask}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Task Item Component
const TaskItem: React.FC<{ 
  title: string; 
  project?: string; 
  completed?: boolean;
  onClick?: () => void;
}> = ({ title, project, completed, onClick }) => {
  return (
    <li 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        fontSize: '14px',
        cursor: onClick ? 'pointer' : 'default',
        padding: '5px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
        backgroundColor: 'transparent'
      }}
      onClick={onClick}
      onMouseOver={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
        }
      }}
      onMouseOut={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <FiCheckCircle 
        size={16} 
        color={completed ? "var(--success-color)" : "#aaa"} 
      />
      <span style={{
        textDecoration: completed ? 'line-through' : 'none',
        color: completed ? 'var(--light-text)' : 'inherit'
      }}>
        {title}
      </span>
      {project && (
        <span style={{ 
          fontSize: '12px',
          color: 'var(--light-text)',
          fontWeight: '400'
        }}> {project}</span>
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