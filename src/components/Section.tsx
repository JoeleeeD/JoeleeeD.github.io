import React from "react";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = "" }) => (
  <section id={id} className={`py-16 px-4 ${className}`}>
    {children}
  </section>
); 