import TaskItem from "./TaskItem";

const TaskLists = () => {
  const items = [
    {
      id: 1,
      title: "Task 1",
      priorityId: 3,
      status: 0,
    },
    {
      id: 2,
      title: "Task 2",
      priorityId: 2,
      status: 0,
    },
    {
      id: 3,
      title: "Task 3",
      priorityId: 4,
      status: 0,
    },
    {
      id: 4,
      title: "Task 4",
      priorityId: 1,
      status: 1,
    },
    {
      id: 5,
      title: "Task 5",
      priorityId: 3,
      status: 1,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        return <TaskItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default TaskLists;
