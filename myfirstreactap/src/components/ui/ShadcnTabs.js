import React, { useState } from 'react';
import { styles, colors } from './shadcn-style';

const Tab = ({ children, isActive, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const tabStyle = {
    ...styles.tabTrigger,
    ...(isActive ? styles.tabTriggerActive : {}),
    ...(isHovering && !isActive ? { color: colors.foreground } : {})
  };
  
  return (
    <button 
      style={tabStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, activeValue }) => {
  if (value !== activeValue) return null;
  
  return (
    <div style={{ padding: '1rem 0' }}>
      {children}
    </div>
  );
};

const ShadcnTabs = ({ 
  children,
  defaultValue,
  value,
  onValueChange,
  className = ''
}) => {
  const [localValue, setLocalValue] = useState(defaultValue);
  const activeValue = value !== undefined ? value : localValue;
  
  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setLocalValue(newValue);
    }
    
    if (onValueChange) {
      onValueChange(newValue);
    }
  };
  
  // Filter for Tab and TabsContent components
  const tabElements = React.Children.toArray(children).filter(
    child => child.type === Tab
  );
  
  const contentElements = React.Children.toArray(children).filter(
    child => child.type === TabsContent
  );
  
  return (
    <div style={{ ...JSON.parse(className || '{}') }}>
      <div style={styles.tabsList}>
        {tabElements.map((tab, index) => {
          const tabValue = tab.props.value;
          return React.cloneElement(tab, {
            key: `tab-${index}`,
            isActive: tabValue === activeValue,
            onClick: () => handleValueChange(tabValue)
          });
        })}
      </div>
      
      <div>
        {contentElements.map((content, index) => {
          return React.cloneElement(content, {
            key: `content-${index}`,
            activeValue
          });
        })}
      </div>
    </div>
  );
};

ShadcnTabs.Tab = Tab;
ShadcnTabs.Content = TabsContent;

export default ShadcnTabs; 