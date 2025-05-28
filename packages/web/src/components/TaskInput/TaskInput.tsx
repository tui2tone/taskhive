import type { TaskOptionItem } from "./TaskOption";
import TaskOption from "./TaskOption";

const TaskInput = () => {
  const priorityOptions: TaskOptionItem[] = [
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
  return (
    <div className="fixed bottom-0 left-0 w-full h-auto">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-screen-lg min-h-32 flex items-start justify-start">
        <div className="bg-white rounded-lg border border-gray-100 shadow-xl w-full">
          <input
            className="w-full  active:border-amber-200 border-b border-gray-100 px-4 py-6 shadow-gray-200"
            placeholder="What needs to be done?"
          ></input>
          <div className="w-full flex px-4 py-4">
            <TaskOption title="Priority" items={priorityOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
