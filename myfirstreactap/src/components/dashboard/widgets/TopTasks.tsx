import React, { useState } from 'react';
import Card from '../../ui/Card';
import { Icon } from '../../ui/Icon';

interface Task {
  id: string;
  name: string;
  project: string;
  duration: string;
  status: 'Completed' | 'To do';
}

export const TopTasks: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Format date for display
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Mock data for tasks
  const tasks: Task[] = [
    {
      id: '1',
      name: 'Update design system',
      project: 'Website Redesign',
      duration: '3h 15m',
      status: 'Completed'
    },
    {
      id: '2',
      name: 'Content strategy meeting',
      project: 'Marketing',
      duration: '1h 30m',
      status: 'To do'
    },
    {
      id: '3',
      name: 'User flow optimization',
      project: 'Mobile App',
      duration: '2h 45m',
      status: 'To do'
    },
    {
      id: '4',
      name: 'API documentation',
      project: 'Development',
      duration: '2h 20m',
      status: 'To do'
    },
    {
      id: '5',
      name: 'Customer feedback analysis',
      project: 'Research',
      duration: '1h 45m',
      status: 'Completed'
    }
  ];

  return (
    <Card 
      title="Top Tasks"
      action={
        <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
          <span>{formattedDate}</span>
          <Icon name="calendar-line" size="sm" className="ml-1" />
        </button>
      }
      fullHeight
    >
      <div className="space-y-2 h-[360px] overflow-y-auto pr-1 custom-scrollbar">
        {tasks.map((task, index) => (
          <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-5 h-5 flex items-center justify-center text-gray-500 mr-3">
                {index + 1}.
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">{task.name}</h4>
                <div className="flex items-center mt-0.5">
                  <span className="text-xs text-gray-500">
                    {task.project} • {task.duration}
                  </span>
                </div>
              </div>
            </div>
            <div className={`flex items-center text-xs font-medium ${
              task.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-1 ${
                task.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <span>{task.status}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}; 