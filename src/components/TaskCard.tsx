import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate?: string;
  status?: "pending" | "in-progress" | "completed";
  onAction?: () => void;
  actionLabel?: string;
}

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const statusIcons = {
  pending: <Clock className="w-4 h-4 mr-1" />,
  "in-progress": <AlertCircle className="w-4 h-4 mr-1" />,
  completed: <CheckCircle className="w-4 h-4 mr-1" />,
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  status = "pending",
  onAction,
  actionLabel = "Mark as Done",
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`flex items-center px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}>{statusIcons[status]}{status.replace("-", " ")}</span>
      </div>
      <p className="text-gray-700 text-sm">{description}</p>
      {dueDate && (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Due: {dueDate}
        </div>
      )}
      {onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm self-end"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default TaskCard; 