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
  // Vibrant primary button with gradient
  primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500",
  
  // Elegant secondary with subtle background
  secondary: "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200",
  
  // Clean default with neutral tones
  default: "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100"
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
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
        disabled:cursor-not-allowed
        disabled:opacity-60
      `}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span className="whitespace-nowrap">{text}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};