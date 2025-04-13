import React, { useState, useEffect } from 'react';
import { FiPlus, FiCheckCircle, FiCircle, FiCalendar, FiX } from 'react-icons/fi';
import { format, parseISO, addDays, isAfter, isBefore, isToday } from 'date-fns';
import GoalCalendar from './GoalCalendar';
import { useGoals } from '../contexts/GoalContext';
import { Target } from '../types';

type UpcomingGoal = {
  target: Target;
  goalId: string;
  goalTitle: string;
  daysUntilDue: number;
};

const GoalCalendarView: React.FC = () => {
  const { goals, updateTarget, addTarget } = useGoals();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [upcomingGoals, setUpcomingGoals] = useState<UpcomingGoal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<{ target: Target; goalId: string; goalTitle: string } | null>(null);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [selectedParentGoal, setSelectedParentGoal] = useState<string | null>(goals.length > 0 ? goals[0].id : null);
  
  // Get goals for selected date
  const getGoalsForSelectedDate = (): { target: Target; goalId: string; goalTitle: string }[] => {
    const goalsForDate: { target: Target; goalId: string; goalTitle: string }[] = [];
    
    goals.forEach(goal => {
      goal.targets.forEach(target => {
        if (target.dueDate && format(parseISO(target.dueDate), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')) {
          goalsForDate.push({
            target,
            goalId: goal.id,
            goalTitle: goal.title
          });
        }
      });
    });
    
    return goalsForDate;
  };
  
  // Get all upcoming goals for the next 30 days
  useEffect(() => {
    const upcoming: UpcomingGoal[] = [];
    const today = new Date();
    const thirtyDaysFromNow = addDays(today, 30);
    
    goals.forEach(goal => {
      goal.targets.forEach(target => {
        if (target.dueDate) {
          const dueDate = parseISO(target.dueDate);
          if ((isToday(dueDate) || isAfter(dueDate, today)) && isBefore(dueDate, thirtyDaysFromNow)) {
            // Calculate days until due
            const daysUntilDue = Math.round((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            upcoming.push({
              target,
              goalId: goal.id,
              goalTitle: goal.title,
              daysUntilDue
            });
          }
        }
      });
    });
    
    // Sort by due date
    upcoming.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
    
    setUpcomingGoals(upcoming);
  }, [goals]);
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedGoal(null);
  };
  
  const handleGoalSelect = (goalId: string, parentGoalId: string) => {
    const goal = goals.find(g => g.id === parentGoalId);
    if (goal) {
      const target = goal.targets.find(t => t.id === goalId);
      if (target) {
        setSelectedGoal({
          target,
          goalId: goal.id,
          goalTitle: goal.title
        });
      }
    }
  };
  
  const toggleGoalCompletion = (goalId: string, target: Target) => {
    updateTarget(goalId, { ...target, completed: !target.completed });
  };

  const handleAddGoal = () => {
    if (goalTitle.trim() && selectedParentGoal) {
      addTarget(selectedParentGoal, {
        title: goalTitle,
        completed: false,
        dueDate: selectedDate.toISOString(),
        progress: 0
      });
      
      // Reset and close modal
      setGoalTitle('');
      setShowAddGoalModal(false);
    }
  };
  
  const goalsForDate = getGoalsForSelectedDate();
  
  return (
    <div style={{ 
      padding: '20px', 
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gridTemplateRows: 'auto auto',
      gap: '20px',
      height: '100%',
      overflow: 'auto'
    }}>
      {/* Main Calendar */}
      <GoalCalendar 
        onDateSelect={handleDateSelect}
        onGoalSelect={handleGoalSelect}
      />
      
      {/* Selected Goal or Today's Goals */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: 'var(--shadow)',
        height: 'fit-content'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '500' }}>
            {selectedGoal 
              ? 'Goal Details' 
              : format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          {!selectedGoal && (
            <button 
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onClick={() => setShowAddGoalModal(true)}
            >
              <FiPlus size={14} />
              Create Goal
            </button>
          )}
        </div>
        
        {selectedGoal ? (
          <div style={{ padding: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px'
            }}>
              <div 
                onClick={() => toggleGoalCompletion(selectedGoal.goalId, selectedGoal.target)}
                style={{ cursor: 'pointer' }}
              >
                {selectedGoal.target.completed ? (
                  <FiCheckCircle size={20} color="var(--success-color)" />
                ) : (
                  <FiCircle size={20} color="var(--light-text)" />
                )}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: selectedGoal.target.completed ? 'line-through' : 'none',
                color: selectedGoal.target.completed ? 'var(--light-text)' : 'var(--text-color)'
              }}>
                {selectedGoal.target.title}
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', color: 'var(--light-text)', marginBottom: '5px' }}>
                Parent Goal
              </div>
              <div>{selectedGoal.goalTitle}</div>
            </div>
            
            {selectedGoal.target.dueDate && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', color: 'var(--light-text)', marginBottom: '5px' }}>
                  Due Date
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FiCalendar size={14} />
                  {format(parseISO(selectedGoal.target.dueDate), 'MMMM d, yyyy')}
                </div>
              </div>
            )}
            
            {selectedGoal.target.assignee && (
              <div>
                <div style={{ fontSize: '12px', color: 'var(--light-text)', marginBottom: '5px' }}>
                  Assignee
                </div>
                <div>{selectedGoal.target.assignee.name}</div>
              </div>
            )}
            
            <div style={{ marginTop: '20px' }}>
              <div style={{ 
                width: '100%', 
                height: '6px', 
                backgroundColor: 'var(--hover-bg)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${selectedGoal.target.progress}%`,
                  backgroundColor: 'var(--primary-color)',
                  borderRadius: '3px'
                }} />
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '5px',
                fontSize: '12px',
                color: 'var(--light-text)'
              }}>
                <span>Progress</span>
                <span>{selectedGoal.target.progress}%</span>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedGoal(null)}
              style={{
                marginTop: '20px',
                padding: '8px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'var(--hover-bg)',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Back to Calendar
            </button>
          </div>
        ) : goalsForDate.length > 0 ? (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {goalsForDate.map((goal, index) => (
              <li 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--hover-bg)',
                  cursor: 'pointer'
                }}
                onClick={() => handleGoalSelect(goal.target.id, goal.goalId)}
              >
                {goal.target.completed ? (
                  <FiCheckCircle size={16} color="var(--success-color)" />
                ) : (
                  <FiCircle size={16} color="var(--light-text)" />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: goal.target.completed ? '400' : '500',
                    textDecoration: goal.target.completed ? 'line-through' : 'none',
                    color: goal.target.completed ? 'var(--light-text)' : 'var(--text-color)'
                  }}>
                    {goal.target.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--light-text)' }}>
                    From: {goal.goalTitle}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 0',
            color: 'var(--light-text)'
          }}>
            <p style={{ marginBottom: '5px' }}>No goals for this day</p>
            <small>Select a different date or add a new goal</small>
          </div>
        )}
      </div>
      
      {/* Upcoming Goals */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: 'var(--shadow)',
        gridColumn: '1 / -1',
        marginTop: '20px'
      }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: '500',
          marginBottom: '15px'
        }}>
          Upcoming Goals (Next 30 Days)
        </h2>
        
        {upcomingGoals.length > 0 ? (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '15px'
          }}>
            {upcomingGoals.map((goal, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  backgroundColor: goal.daysUntilDue === 0 ? 'var(--light-primary-color)' : 'var(--hover-bg)',
                  borderRadius: '8px',
                  border: goal.daysUntilDue === 0 ? '1px solid var(--primary-color)' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => handleGoalSelect(goal.target.id, goal.goalId)}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '5px'
                }}>
                  {goal.target.completed ? (
                    <FiCheckCircle size={16} color="var(--success-color)" />
                  ) : (
                    <FiCircle size={16} color="var(--light-text)" />
                  )}
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    flex: 1,
                    textDecoration: goal.target.completed ? 'line-through' : 'none'
                  }}>
                    {goal.target.title}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: 'var(--light-text)',
                  marginLeft: '26px'
                }}>
                  <span>From: {goal.goalTitle}</span>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: goal.daysUntilDue === 0 ? 'var(--primary-color)' : 'var(--light-text)',
                    fontWeight: goal.daysUntilDue === 0 ? '500' : '400'
                  }}>
                    <FiCalendar size={12} />
                    {goal.daysUntilDue === 0 
                      ? 'Today' 
                      : goal.daysUntilDue === 1 
                        ? 'Tomorrow' 
                        : `In ${goal.daysUntilDue} days`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 0',
            color: 'var(--light-text)'
          }}>
            <p>No upcoming goals for the next 30 days</p>
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
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
                onClick={() => setShowAddGoalModal(false)}
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
                htmlFor="goalTitle" 
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
                id="goalTitle"
                type="text"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
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
                htmlFor="parentGoalSelect"
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
                id="parentGoalSelect"
                value={selectedParentGoal || ''}
                onChange={(e) => setSelectedParentGoal(e.target.value)}
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
                onClick={() => setShowAddGoalModal(false)}
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
                onClick={handleAddGoal}
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
    </div>
  );
};

export default GoalCalendarView; 