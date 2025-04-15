import React from 'react';

interface MeasurementCardProps {
  title: string;
  value: string | number;
  maxValue?: number;
  color?: string;
}

const MeasurementCard = ({
  title,
  value,
  maxValue = 10,
  color = '#10b981',
}: MeasurementCardProps) => {
  return (
    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
      <div className="mb-1 text-sm font-medium text-neutral-300">{title}</div>
      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold text-white">{value}</div>
        {maxValue && <div className="text-sm text-neutral-500">/ {maxValue}</div>}
      </div>
      <div className="mt-3 h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(Number(value) / maxValue) * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default MeasurementCard;
