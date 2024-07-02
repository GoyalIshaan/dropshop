import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type DetailsSectionProps = {
  title: string;
  icon: React.ReactNode;
  details: { label: string; value: string | React.ReactNode }[];
  status?: { label: string; value: boolean };
};

const DetailsSection: React.FC<DetailsSectionProps> = ({
  title,
  icon,
  details,
  status,
}) => {
  return (
    <section className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        {icon} {title}
      </h2>
      {details.map((detail, index) => (
        <p key={index}>
          <strong>{detail.label}:</strong> {detail.value}
        </p>
      ))}
      {status && (
        <p>
          <strong>{status.label}:</strong>{' '}
          {status.value ? (
            <FaCheckCircle className="text-green-500 inline" />
          ) : (
            <FaTimesCircle className="text-red-500 inline" />
          )}
        </p>
      )}
    </section>
  );
};

export default DetailsSection;
