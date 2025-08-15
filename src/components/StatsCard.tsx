import React from "react";

export interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType?: "positive" | "negative";
  icon: React.ReactNode;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color = "#3B82F6", // default Tailwind blue-500
}) => {
  const changeColor =
    changeType === "positive"
      ? "text-green-500"
      : changeType === "negative"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div
      className="p-4 rounded-lg shadow bg-white flex items-center justify-between"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-sm font-semibold ${changeColor}`}>{change}</p>
      </div>

      <div className="text-3xl" style={{ color }}>
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
