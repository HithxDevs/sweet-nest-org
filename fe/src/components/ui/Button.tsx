import React from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "default";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const variantStyles: Record<ButtonProps["variant"], string> = {
  // High contrast primary button
  primary: "bg-purple-600 text-white hover:bg-purple-500 ",
  
  // Subtle secondary button
  secondary: "bg-purple-300/40 backdrop-blur text-purple-600 hover:bg-purple-300/60" ,
  
  // Neutral default button
  default: "bg-gray-100 text-gray-700 hover:bg-gray-200 "
};

const sizeStyles: Record<ButtonProps["size"], string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        rounded-lg 
        inline-flex
        items-center 
        justify-center 
        gap-2 
        font-medium
        transition-all
        duration-200
        focus:outline-none
      `}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span className="whitespace-nowrap">{text}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};