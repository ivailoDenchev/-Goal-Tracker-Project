import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth,
  isSameDay,
  isToday,
  parseISO
} from 'date-fns';
import { Goal, Target } from '../types';
import { useGoals } from '../contexts/GoalContext';

interface CreateGoalCalendarProps {
  onDateSelect?: (date: Date) => void;
  onGoalSelect?: (goalId: string, parentGoalId: string) => void;
}

const CreateGoalCalendar: React.FC<CreateGoalCalendarProps> = ({ onDateSelect, onGoalSelect }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { goals, updateTarget } = useGoals();
  
  // Get goals for a specific day
  const getGoalsForDay = (day: Date): { title: string; completed: boolean; goalId: string; id: string }[] => {
    const goalsForDay: { title: string; completed: boolean; goalId: string; id: string }[] = [];
    
    goals.forEach(goal => {
      goal.targets.forEach(target => {
        if (target.dueDate && isSameDay(parseISO(target.dueDate), day)) {
          goalsForDay.push({
            title: target.title,
            completed: target.completed,
            goalId: goal.id,
            id: target.id
          });
        }
      });
    });
    
    return goalsForDay;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Get all days in the current month
  const daysInMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  };

  // Handle day click
  const handleDayClick = (day: Date) => {
    if (onDateSelect) {
      onDateSelect(day);
    }
  };
  
  // Handle goal click
  const handleGoalClick = (event: React.MouseEvent, goalId: string, parentGoalId: string) => {
    event.stopPropagation(); // Prevent triggering day click
    
    if (onGoalSelect) {
      onGoalSelect(goalId, parentGoalId);
    } else {
      // Toggle completion if no goal select handler
      const goal = goals.find(g => g.id === parentGoalId);
      if (goal) {
        const target = goal.targets.find(t => t.id === goalId);
        if (target) {
          updateTarget(parentGoalId, { ...target, completed: !target.completed });
        }
      }
    }
  };

  const days = daysInMonth();
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: 'var(--card-bg)',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: 'var(--shadow)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '500' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={prevMonth}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px'
      }}>
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div 
            key={day} 
            style={{
              textAlign: 'center',
              padding: '5px 0',
              fontSize: '12px',
              fontWeight: '500',
              color: 'var(--light-text)'
            }}
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map(day => {
          const goalsForDay = getGoalsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isDayToday = isToday(day);
          
          return (
            <div
              key={day.toString()}
              onClick={() => handleDayClick(day)}
              style={{
                backgroundColor: isDayToday ? 'var(--light-primary-color)' : 'var(--card-bg)',
                borderRadius: '4px',
                padding: '5px',
                cursor: 'pointer',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                opacity: isCurrentMonth ? 1 : 0.5,
                border: isDayToday ? '1px solid var(--primary-color)' : '1px solid var(--border-color)'
              }}
            >
              <div style={{
                fontWeight: isDayToday ? '600' : '400',
                color: isDayToday ? 'var(--primary-color)' : 'var(--text-color)',
                fontSize: '14px',
                marginBottom: '5px'
              }}>
                {format(day, 'd')}
              </div>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                overflow: 'hidden'
              }}>
                {goalsForDay.slice(0, 3).map((goal, index) => (
                  <div 
                    key={index}
                    onClick={(e) => handleGoalClick(e, goal.id, goal.goalId)}
                    style={{
                      fontSize: '10px',
                      padding: '2px 4px',
                      backgroundColor: goal.completed ? 'var(--success-bg)' : 'var(--light-primary-color)',
                      color: goal.completed ? 'var(--success-color)' : 'var(--primary-color)',
                      borderRadius: '2px',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {goal.title}
                  </div>
                ))}
                {goalsForDay.length > 3 && (
                  <div style={{ 
                    fontSize: '10px', 
                    color: 'var(--light-text)', 
                    textAlign: 'center' 
                  }}>
                    +{goalsForDay.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateGoalCalendar; 