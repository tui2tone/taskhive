import { useForm, type SubmitHandler } from "react-hook-form";
import PrioritySelector from "./PrioritySelector";
import { useTodos } from "../../contexts/Todo.provider";
import { useEffect } from "react";

type TaskFilters = {
  priorityId: number;
};

const DefaultPriorityID = 0;

const TaskFilter = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { },
  } = useForm<TaskFilters>({
    defaultValues: {
      priorityId: DefaultPriorityID,
    },
  });

  const { setFilter } = useTodos();
  const onSubmit: SubmitHandler<TaskFilters> = () => {};

  const data = watch();
  useEffect(() => {
    function setFilterData() {
      setFilter({
        priorityId: data.priorityId || 0,
      });
    }
    setFilterData();
  }, [data.priorityId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-4 mb-4">
        <div className="font-medium text-sm mb-1 text-gray-500">Filter By</div>
        <PrioritySelector control={control} name="priorityId" />
      </div>
    </form>
  );
};

export default TaskFilter;
