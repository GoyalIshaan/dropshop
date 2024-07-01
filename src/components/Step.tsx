import React from 'react';

interface StepProps {
  title: string;
  icon: React.ReactElement;
  active: boolean;
  completed: boolean;
}

const Step: React.FC<StepProps> = ({ title, icon, active, completed }) => {
  return (
    <div
      className={`flex-1 text-center ${completed ? 'text-green-500' : active ? 'text-blue-500' : 'text-gray-400'}`}
    >
      <div
        className={`flex justify-center items-center mb-2 ${active ? 'animate-bounce' : ''}`}
      >
        {icon}
      </div>
      <span className="block font-semibold">{title}</span>
      <div
        className={`h-1 mt-2 rounded ${completed ? 'bg-green-500' : 'bg-gray-300'}`}
      ></div>
    </div>
  );
};

export default Step;
