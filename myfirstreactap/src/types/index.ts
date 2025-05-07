// Common type definitions

// Theme related types
export interface Theme {
  color: string;
  backgroundColor?: string;
  textColor?: string;
}

// Component prop types
export interface CardProps {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  children?: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export interface TabProps {
  children: React.ReactNode;
  value: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  activeValue?: string;
}

// Navigation related types
export interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

// Form related types
export interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// API related types
export interface UserData {
  id: number;
  name: string;
  email: string;
  username?: string;
}

export interface ProductData {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
} 