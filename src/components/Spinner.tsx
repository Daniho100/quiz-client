import React from "react";

interface SpinnerProps {
  size?: number; 
  color?: string; 
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = "#3B82F6" }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="border-4 border-t-transparent border-solid rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent ${color} transparent`,
        }}
      ></div>
    </div>
  );
};

export default Spinner;
