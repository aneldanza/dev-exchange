import React, { useState, useEffect, ReactNode } from "react";
import { Alert } from "flowbite-react";

interface FlashProps {
  message?: string;
  duration?: number; // duration in milliseconds
  children?: ReactNode;
  style?: "success" | "failure" | "warning" | "info";
  display: boolean;
  setFormError: React.Dispatch<React.SetStateAction<string[]>>;
}

const Flash: React.FC<FlashProps> = ({
  message,
  duration = 2000,
  children,
  style,
  display,
  setFormError,
}) => {
  const [visible, setVisible] = useState(display);

  useEffect(() => {
    if (display) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFormError([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [display, duration, setFormError]);

  // if (!visible) return null;

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
