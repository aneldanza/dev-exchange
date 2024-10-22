import React, { useState, useEffect, ReactNode } from "react";

interface FlashProps {
  message?: string;
  duration?: number; // duration in milliseconds
  children?: ReactNode;
  style?: string;
}

const Flash: React.FC<FlashProps> = ({
  message,
  duration = 3000,
  children,
  style,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`flash ${style}`}>
      {message && message}
      {children && children}
    </div>
  );
};

export default Flash;
