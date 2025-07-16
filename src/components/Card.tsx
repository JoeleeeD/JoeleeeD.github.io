import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-blue-500 rounded-xl shadow p-6 ${className}`}>
    {children}
  </div>
); 