import { LucideIcon } from "lucide-react";

interface WeatherCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function WeatherCard({ label, value, icon: Icon, color }: WeatherCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
} 