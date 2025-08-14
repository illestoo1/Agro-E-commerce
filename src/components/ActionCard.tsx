import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

export default function ActionCard({ title, icon: Icon, color, onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className={`p-3 rounded-full ${color} text-white mb-2`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-gray-900">{title}</span>
    </button>
  );
} 