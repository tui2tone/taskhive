import React from "react";
import TaskOption, { type TaskOptionItem } from "./TaskOption";
import { Controller } from "react-hook-form";

export const priorityOptions: TaskOptionItem[] = [
  {
    id: 0,
    name: "All Task",
    type: 1,
    color: "#333333",
    bgColor: "#FFFFFF",
  },
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

interface PrioritySelectorProps {
  control: any;
  name: string;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  control,
  name,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TaskOption
          title="Priority"
          items={priorityOptions}
          selectedValue={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default PrioritySelector;
