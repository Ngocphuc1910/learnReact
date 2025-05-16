import React, { useState, useRef, useEffect } from 'react';
import { useFocusStore } from '../../../store/useFocusStore';
import { formatDate } from '../../../utils/timeUtils';

interface DateRangeOption {
  label: string;
  days: number;
  value: string;
}

export const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const setDateRange = useFocusStore(state => state.setDateRange);
  const currentDateRange = useFocusStore(state => state.dateRange);
  
  // Date range options
  const dateRangeOptions: DateRangeOption[] = [
    { label: 'Today', days: 0, value: 'today' },
    { label: 'Last 7 days', days: 7, value: '7days' },
    { label: 'Last 30 days', days: 30, value: '30days' },
    { label: 'Custom range', days: 0, value: 'custom' },
  ];
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setDatePickerOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle date range selection
  const handleDateRangeSelect = (option: DateRangeOption) => {
    if (option.value === 'custom') {
      setDatePickerOpen(true);
      setDropdownOpen(false);
      return;
    }
    
    const endDate = new Date();
    let startDate = new Date();
    
    if (option.days > 0) {
      startDate.setDate(startDate.getDate() - option.days);
    }
    
    setDateRange({
      startDate,
      endDate,
      label: option.label
    });
    
    setDropdownOpen(false);
  };
  
  // Apply custom date range
  const applyCustomDateRange = () => {
    // This would normally use a date picker library
    // For now, we'll just use a 14-day range as an example
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);
    
    setDateRange({
      startDate,
      endDate,
      label: 'Custom Range'
    });
    
    setDatePickerOpen(false);
  };
  
  return (
    <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
      <div className="flex items-center">
        <div className="text-lg font-semibold text-gray-800">Dashboard</div>
        <div className="ml-4 text-sm text-gray-500">{formatDate(new Date())}</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{currentDateRange.label || 'Select date range'}</span>
            <div className="w-4 h-4 flex items-center justify-center ml-2">
              <i className="ri-arrow-down-s-line"></i>
            </div>
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => handleDateRangeSelect(option)}
                >
                  <span>{option.label}</span>
                  {option.value === 'custom' && (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-calendar-line"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
          
          {datePickerOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-700">
                  Select date range
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setDatePickerOpen(false)}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-close-line"></i>
                  </div>
                </button>
              </div>
              
              <div>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Select date range"
                  readOnly
                  value="Custom date range would use a date picker library"
                />
              </div>
              
              <button
                className="w-full mt-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-opacity-90"
                onClick={applyCustomDateRange}
              >
                Apply
              </button>
            </div>
          )}
        </div>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <div className="w-5 h-5 flex items-center justify-center text-gray-500">
            <i className="ri-notification-line"></i>
          </div>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <div className="w-5 h-5 flex items-center justify-center text-gray-500">
            <i className="ri-settings-line"></i>
          </div>
        </button>
      </div>
    </div>
  );
}; 