"use client";
import React from "react";
import { Icon } from "@iconify/react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
}) => {
  // Color styles based on changeType
  const changeColors = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-500",
  };

  const iconBgColors = {
    positive: "bg-green-100",
    negative: "bg-red-100",
    neutral: "bg-gray-100",
  };

  const changeIcons = {
    positive: "mdi:arrow-up",
    negative: "mdi:arrow-down",
    neutral: "mdi:minus",
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBgColors[changeType]}`}
        >
          <Icon icon={icon} className="text-2xl" />
        </div>

        {/* Change badge */}
        {change && (
          <div
            className={`flex items-center gap-1 ${changeColors[changeType]}`}
          >
            <Icon icon={changeIcons[changeType]} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>

      {/* Title & Value */}
      <h3 className="mt-4 text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default StatsCard;
