import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFocusStore } from '../../../store/useFocusStore';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const user = useFocusStore(state => state.user);
  
  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'ri-dashboard-line' },
    { label: 'Projects & Tasks', path: '/dashboard/projects', icon: 'ri-task-line' },
    { label: 'Pomodoro Timer', path: '/dashboard/timer', icon: 'ri-timer-line' },
    { label: 'Calendar', path: '/dashboard/calendar', icon: 'ri-calendar-line' },
    { label: 'Settings', path: '/dashboard/settings', icon: 'ri-settings-line' },
  ];
  
  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user.name) return '';
    return user.name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <aside
      className={`${collapsed ? 'w-0 md:w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-screen`}
      id="sidebar"
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-['Pacifico'] text-primary">Make10000hours</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <div className="w-5 h-5 flex items-center justify-center text-gray-500">
            <i className={`ri-arrow-${collapsed ? 'right' : 'left'}-s-line`}></i>
          </div>
        </button>
      </div>
      
      {!collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white"
            >
              <span className="font-medium">{getInitials()}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      )}
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'text-primary bg-indigo-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className={item.icon}></i>
                  </div>
                  {!collapsed && item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/"
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
        >
          <div className="w-5 h-5 flex items-center justify-center mr-3">
            <i className="ri-arrow-left-line"></i>
          </div>
          {!collapsed && 'Back to Home'}
        </Link>
      </div>
    </aside>
  );
}; 