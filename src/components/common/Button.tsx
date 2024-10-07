import React, { ReactNode } from "react";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string; // New prop for button classname
  type?: "button" | "submit" | "reset"; // New prop for button type
};

export const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  onClick,
  className,
  type,
}) => {
  return (
    <button
      type={type || "button"}
      className={`${className} flex items-center gap-1`}
      onClick={onClick}
    >
      {icon && <span className="self-center">{icon}</span>}
      {title}
    </button>
  );
};

export default Button;
