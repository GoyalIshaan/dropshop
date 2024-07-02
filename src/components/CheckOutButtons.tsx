import React from 'react';

type CheckOutButtonsProps = {
  handleBack: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  text: string;
};

const CheckOutButtons: React.FC<CheckOutButtonsProps> = ({
  handleBack,
  onSubmit,
  isLoading = false,
  text,
}) => {
  const buttonStyling: string =
    'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105';
  return (
    <div className="flex justify-between pt-4 space-x-4">
      <button
        type="button"
        onClick={handleBack}
        className={`w-1/5 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 ${buttonStyling}`}
      >
        Back
      </button>
      <button
        type="submit"
        onClick={onSubmit} // Call onSubmit with no arguments
        disabled={isLoading}
        className={`flex-grow bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 ${buttonStyling}`}
      >
        {isLoading ? 'Placing Order...' : text}
      </button>
    </div>
  );
};

export default CheckOutButtons;
