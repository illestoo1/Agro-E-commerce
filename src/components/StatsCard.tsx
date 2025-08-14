import React from "react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string; // e.g., "bg-green-500" for icon badge
  colorClass?: string; // e.g., "bg-white text-gray-900" for card container
  change?: string; // e.g., "+3.5%"
  changeType?: "positive" | "negative";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  colorClass = "bg-white text-gray-900",
  change,
  changeType,
}) => (
  <div className={`rounded-lg shadow p-4 ${colorClass}`}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`p-2 rounded-md ${color ? `${color} text-white` : "bg-gray-100 text-gray-600"}`}>
            {icon}
          </div>
        )}
    <div>
          <div className="text-sm font-medium text-gray-600">{title}</div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
      </div>
      {change && (
        <span
          className={`text-sm font-semibold ${
            changeType === "negative" ? "text-red-600" : "text-green-600"
          }`}
        >
          {change}
        </span>
      )}
    </div>
  </div>
);

export default StatsCard; 