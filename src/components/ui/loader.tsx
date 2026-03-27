import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullscreen?: boolean;
}

export const Loader = ({ className, size = 'medium', fullscreen = false }: LoaderProps) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const content = (
    <div className={cn("text-[#c4a15a] flex items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin", sizeClasses[size])} strokeWidth={2} />
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0a08]/90 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full py-12">
      {content}
    </div>
  );
};
