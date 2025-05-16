import React from 'react';
import { useFocusStore } from '../../../store/useFocusStore';

export const FocusStreak: React.FC = () => {
  const focusStreak = useFocusStore(state => state.focusStreak);
  
  // Get the last 7 days of streak data for display
  const lastSevenDays = focusStreak.streakDates.slice(0, 7).reverse();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Focus Streak
        </h3>
        <div className="flex items-center text-sm text-green-500 font-medium">
          <div className="w-4 h-4 flex items-center justify-center mr-1">
            <i className="ri-fire-line"></i>
          </div>
          <span>{focusStreak.currentStreak} days</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {lastSevenDays.map((day, index) => {
          const date = new Date(day.date);
          const dateNumber = date.getDate();
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
          
          // Different styles based on focus status
          let dayClass = "w-8 h-8 rounded-full flex items-center justify-center text-xs";
          if (index === lastSevenDays.length - 1) {
            // Today - outlined if not focused yet
            dayClass += day.hasFocused 
              ? " bg-primary bg-opacity-10 text-primary"
              : " bg-white border-2 border-dashed border-gray-200 text-gray-400";
          } else if (day.hasFocused) {
            // Past day with focus
            dayClass += " bg-primary bg-opacity-10 text-primary";
          } else {
            // Past day without focus
            dayClass += " bg-gray-100 text-gray-400";
          }
          
          return (
            <div key={date.toISOString()} className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">{dayOfWeek}</div>
              <div className={dayClass}>
                {dateNumber}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Longest streak</span>
          <span className="text-sm font-medium text-gray-800">{focusStreak.longestStreak} days</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current streak</span>
          <span className="text-sm font-medium text-gray-800">{focusStreak.currentStreak} days</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total focus days</span>
          <span className="text-sm font-medium text-gray-800">{focusStreak.totalFocusDays} days</span>
        </div>
      </div>
    </div>
  );
}; 