import { useForm, type SubmitHandler } from "react-hook-form";
import type { TaskOptionItem } from "./TaskOption";
import TaskOption from "./TaskOption";
import PrioritySelector from "./PrioritySelector";
import { useTodos } from "../../contexts/Todo.provider";
import toast from "react-hot-toast";

type TaskInputs = {
  text: string;
  priorityId: number;
};

const TaskInput = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TaskInputs>();

  const { dispatch } = useTodos();
  const onSubmit: SubmitHandler<TaskInputs> = (data) => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        text: data.text,
        priorityId: 3,
        isCompleted: false,
      },
    });

    reset({
      text: "",
    });
  };

  const onSubmitError = () => {
    // Text is required
    if (errors?.text?.type === "required") {
      toast.error("Please type your task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <div className="fixed bottom-0 left-0 w-full h-auto">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-screen-lg min-h-32 flex items-start justify-start">
          <div className="bg-white rounded-lg border border-gray-100 shadow-xl w-full">
            <input
              className="w-full active:border-amber-200 border-b border-gray-100 px-4 py-6 shadow-gray-200"
              placeholder="What needs to be done?"
              {...register("text", { required: true })}
            ></input>
            <div className="w-full flex px-4 py-4">
              <PrioritySelector />
            </div>
          </div>
        </div>
      </div>
      <input type="submit" className="hidden" />
    </form>
  );
};

export default TaskInput;
