import React from "react";
import PriorityBadge from "./PriorityBadge";

interface TaskItemDto {
  id: number;
  title: string;
  priorityId?: number;
  status?: number;
}

interface TaskItemProps {
  item: TaskItemDto;
}

const TaskItem: React.FC<TaskItemProps> = ({ item }) => {
  return (
    <div className="bg-white px-4 py-4 border border-gray-100 rounded flex items-center justify-center gap-3">
      <div>
        <input type="checkbox" checked={item.status == 1} readOnly />
      </div>
      <div className="basis-[100px]">
        <div className="w-full  flex items-center justify-center">
          <PriorityBadge priorityId={item.priorityId} />
        </div>
      </div>
      <div className="flex-1">{item.title}</div>
    </div>
  );
};

export default TaskItem;
