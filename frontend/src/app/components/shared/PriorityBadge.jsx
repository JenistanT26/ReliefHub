import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

const priorityConfig = {
  high: {
    label: "High Priority",
    className: "bg-red-100 text-red-700 border-red-300",
    dotColor: "bg-red-500"
  },
  medium: {
    label: "Medium Priority",
    className: "bg-orange-100 text-orange-700 border-orange-300",
    dotColor: "bg-orange-500"
  },
  low: {
    label: "Low Priority",
    className: "bg-green-100 text-green-700 border-green-300",
    dotColor: "bg-green-500"
  }
};

export default function PriorityBadge({ priority, showDot = true, className }) {
  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {showDot && (
        <span className={cn("w-2 h-2 rounded-full mr-1.5", config.dotColor)} />
      )}
      {config.label}
    </Badge>
  );
}
