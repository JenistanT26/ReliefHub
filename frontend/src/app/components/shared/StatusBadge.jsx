import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

const statusConfig = {
  open: {
    label: "Open",
    className: "bg-blue-100 text-blue-700 border-blue-300"
  },
  matching: {
    label: "Matching",
    className: "bg-yellow-100 text-yellow-700 border-yellow-300"
  },
  locked: {
    label: "Locked",
    className: "bg-orange-100 text-orange-700 border-orange-300"
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-700 border-green-300"
  },
  pending: {
    label: "Pending",
    className: "bg-gray-100 text-gray-700 border-gray-300"
  },
  matched: {
    label: "Matched",
    className: "bg-green-100 text-green-700 border-green-300"
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700 border-emerald-300"
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 border-red-300"
  }
};

export default function StatusBadge({ status, className }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
