import React from 'react';
import { AverageFocusTime } from './widgets/AverageFocusTime';
import { WeeklyBreakdown } from './widgets/WeeklyBreakdown';
import { FocusStreak } from './widgets/FocusStreak';
import { ProjectsWidget } from './widgets/ProjectsWidget';
import { TasksWidget } from './widgets/TasksWidget';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      {/* Focus Time Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AverageFocusTime />
        <WeeklyBreakdown />
        <FocusStreak />
      </div>
      
      {/* Projects and Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProjectsWidget />
        <TasksWidget />
      </div>
    </div>
  );
}; 