import React from "react";

interface PriorityBadgeProps {
  priorityId?: number;
}

interface PriorityItem {
  id: number;
  name: string;
  type: number;
  default?: boolean;
  color: string;
  bgColor?: string;
}

const priorityBadges: PriorityItem[] = [
  {
    id: 1,
    name: "Urgent",
    type: 1,
    color: "#991b1b",
    bgColor: "#fca5a5",
  },
  {
    id: 2,
    name: "High",
    type: 1,
    color: "#a16207",
    bgColor: "#fef9c3",
  },
  {
    id: 3,
    name: "Medium",
    type: 1,
    default: true,
    color: "#0369a1",
    bgColor: "#bfdbfe",
  },
  {
    id: 4,
    name: "Low",
    type: 1,
    color: "#374151",
    bgColor: "#e5e7eb",
  },
];

const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priorityId,
}: PriorityBadgeProps) => {
  const matched = priorityBadges.find((m) => m.id === priorityId);
  if (!matched) {
    return <></>;
  }
  return (
    <span
      className="px-2 py-1 rounded text-sm font-medium"
      style={{
        color: matched.color,
        backgroundColor: matched.bgColor,
      }}
    >
      {matched.name}
    </span>
  );
};

export default PriorityBadge;
