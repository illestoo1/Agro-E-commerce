import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  title: string;
  description: string;
  time: string;
  status: "completed" | "warning";
  icon: LucideIcon;
}

export default function ActivityCard({ title, description, time, status, icon: Icon }: ActivityCardProps) {
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
      <div className={`p-2 rounded-full ${
        status === "completed" ? "bg-green-100" : "bg-yellow-100"
      }`}>
        <Icon className={`h-4 w-4 ${
          status === "completed" ? "text-green-600" : "text-yellow-600"
        }`} />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
} 