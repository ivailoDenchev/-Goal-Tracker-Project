import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Goal, Target, TimelineItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock data
const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Create Q3 Content Plan',
    progress: 30,
    targets: [
      {
        id: '1-1',
        title: 'Finalize campaign brief',
        completed: false,
        dueDate: new Date().toISOString(),
        progress: 65,
        assignee: {
          id: '101',
          name: 'Emily',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        }
      },
      {
        id: '1-2',
        title: 'Audience & market research',
        completed: false,
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        progress: 78,
        assignee: {
          id: '102',
          name: 'Mark',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        }
      },
      {
        id: '1-3',
        title: 'Confirm budgets',
        completed: false,
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        progress: 25,
        assignee: {
          id: '103',
          name: 'Alex',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        }
      },
      {
        id: '1-4',
        title: 'Draft campaign messaging & copy',
        completed: false,
        dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
        progress: 100,
        assignee: {
          id: '104',
          name: 'Zac',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
        }
      }
    ],
    timeline: [
      {
        id: 't1-1',
        title: 'Finalize asset list and bill of materials',
        completed: false,
        assignee: {
          id: '101',
          name: 'Emily'
        }
      },
      {
        id: 't1-2',
        title: 'Define channel strategy',
        completed: false,
        assignee: {
          id: '102',
          name: 'Mark'
        }
      },
      {
        id: 't1-3',
        title: 'Schedule kickoff meeting',
        completed: false,
        assignee: {
          id: '104',
          name: 'Zac'
        }
      }
    ]
  }
];

interface GoalContextType {
  goals: Goal[];
  activeGoal: Goal | null;
  setActiveGoal: (goal: Goal | null) => void;
  addGoal: (title: string) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  addTarget: (goalId: string, target: Omit<Target, 'id'>) => void;
  updateTarget: (goalId: string, target: Target) => void;
  deleteTarget: (goalId: string, targetId: string) => void;
  addTimelineItem: (goalId: string, item: Omit<TimelineItem, 'id'>) => void;
  updateTimelineItem: (goalId: string, item: TimelineItem) => void;
  deleteTimelineItem: (goalId: string, itemId: string) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(initialGoals[0] || null);

  // Calculate goal progress based on targets
  useEffect(() => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal.targets.length === 0) return { ...goal, progress: 0 };
        
        const totalProgress = goal.targets.reduce((sum, target) => sum + target.progress, 0);
        const averageProgress = Math.round(totalProgress / goal.targets.length);
        
        return { ...goal, progress: averageProgress };
      })
    );
  }, []);

  const addGoal = (title: string) => {
    const newGoal: Goal = {
      id: uuidv4(),
      title,
      progress: 0,
      targets: []
    };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    if (activeGoal && activeGoal.id === updatedGoal.id) {
      setActiveGoal(updatedGoal);
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    if (activeGoal && activeGoal.id === id) {
      setActiveGoal(goals.find(goal => goal.id !== id) || null);
    }
  };

  const addTarget = (goalId: string, target: Omit<Target, 'id'>) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newTarget: Target = {
          ...target,
          id: uuidv4()
        };
        const updatedGoal = {
          ...goal,
          targets: [...goal.targets, newTarget]
        };
        if (activeGoal && activeGoal.id === goalId) {
          setActiveGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const updateTarget = (goalId: string, updatedTarget: Target) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = {
          ...goal,
          targets: goal.targets.map(target => 
            target.id === updatedTarget.id ? updatedTarget : target
          )
        };
        if (activeGoal && activeGoal.id === goalId) {
          setActiveGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const deleteTarget = (goalId: string, targetId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = {
          ...goal,
          targets: goal.targets.filter(target => target.id !== targetId)
        };
        if (activeGoal && activeGoal.id === goalId) {
          setActiveGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const addTimelineItem = (goalId: string, item: Omit<TimelineItem, 'id'>) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newItem: TimelineItem = {
          ...item,
          id: uuidv4()
        };
        const timeline = goal.timeline ? [...goal.timeline, newItem] : [newItem];
        const updatedGoal = {
          ...goal,
          timeline
        };
        if (activeGoal && activeGoal.id === goalId) {
          setActiveGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const updateTimelineItem = (goalId: string, updatedItem: TimelineItem) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId && goal.timeline) {
        const updatedGoal = {
          ...goal,
          timeline: goal.timeline.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        };
        if (activeGoal && activeGoal.id === goalId) {
          setActiveGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const deleteTimelineItem = (goalId: string, itemId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId && goal.timeline) {
        const updatedGoal = {
          ...goal,
          timeline: goal.timeline.filter(item => item.id !== itemId)
        };
        if (activeGoal && activeGoal.id === goalId) {
          setActiveGoal(updatedGoal);
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  return (
    <GoalContext.Provider value={{
      goals,
      activeGoal,
      setActiveGoal,
      addGoal,
      updateGoal,
      deleteGoal,
      addTarget,
      updateTarget,
      deleteTarget,
      addTimelineItem,
      updateTimelineItem,
      deleteTimelineItem
    }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}; 