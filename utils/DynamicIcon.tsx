import React from 'react';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // @ts-ignore
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Fallback icon
    return <Icons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};