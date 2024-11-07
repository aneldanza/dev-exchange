import React, { useState, useEffect, ReactNode } from "react";
import { Alert } from "flowbite-react";

interface FlashProps {
  message?: string;
  duration?: number; // duration in milliseconds
  children?: ReactNode;
  style?: "success" | "failure" | "warning" | "info";
  display: boolean;
  resetDisplay: () => void;
}

const Flash: React.FC<FlashProps> = ({
  message,
  duration = 2000,
  children,
  style,
  display,
  resetDisplay,
}) => {
  const [visible, setVisible] = useState(display);

  useEffect(() => {
    if (display) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        resetDisplay();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [display, duration, resetDisplay]);

  return (
    <Alert
      color={style}
      additionalContent={children}
      className={`flash ${!visible && "hidden"}`}
    >
      <span>{message}</span>
    </Alert>
  );
};

export default Flash;
