import React from 'react';
import { useFocusStore } from '../../../store/useFocusStore';
import { formatMinutes, calculateProgress } from '../../../utils/timeUtils';

export const AverageFocusTime: React.FC = () => {
  const averageDailyMinutes = useFocusStore(state => state.getAverageDailyFocusTime());
  const totalFocusMinutes = useFocusStore(state => state.getTotalFocusTime());
  const user = useFocusStore(state => state.user);
  
  // Calculate weekly goal progress (mock data for now)
  const weeklyGoalHours = user.weeklyGoalHours;
  const weeklyGoalMinutes = weeklyGoalHours * 60;
  const weeklyProgress = calculateProgress(1032, weeklyGoalMinutes); // Mock: 17h 12m = 1032 minutes
  
  // Calculate journey progress
  const journeyGoalHours = user.goalHours;
  const journeyGoalMinutes = journeyGoalHours * 60;
  const journeyProgress = calculateProgress(totalFocusMinutes, journeyGoalMinutes);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-800">
          Average Focus Time
        </h3>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-3xl font-bold text-gray-900">{formatMinutes(averageDailyMinutes)}</div>
          <p className="text-sm text-gray-500 mt-2">Daily average</p>
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">{formatMinutes(totalFocusMinutes)}</div>
          <p className="text-sm text-gray-500 mt-2">Total focus time</p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Weekly goal ({weeklyGoalHours}h)</span>
            <span className="font-medium text-gray-700">
              17h 12m / {weeklyGoalHours}h
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${weeklyProgress * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Journey to 10,000 hours</span>
            <span className="font-medium text-gray-700">
              {formatMinutes(totalFocusMinutes)} / {journeyGoalHours}h
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${journeyProgress * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}; 