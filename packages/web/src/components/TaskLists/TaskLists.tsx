import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { TodoSyncStatus, useTodos } from "../../contexts/Todo.provider";
import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";

const TaskLists = () => {
  const { state, filteredTodos } = useTodos();
  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {state.status != TodoSyncStatus.FETCHING && (
          <>
            {filteredTodos?.map((item) => {
              return (
                <motion.div
                  key={item.uuid}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <TaskItem key={item.uuid} item={item} />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>
      {/* No Data State */}
      {state.status == TodoSyncStatus.FETCHED_SUCCESS &&
        filteredTodos?.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl flex items-center justify-center">
              <PlusCircleIcon className="size-20 text-gray-300" />
            </div>
            <p className="text-gray-400 text-lg py-4">
              no task, try to create new one
            </p>
          </div>
        )}
      {/* Loading State */}
      {state.status == TodoSyncStatus.FETCHING && (
        <>
          {[0, 1, 2, 3, 4].map((item) => {
            return (
              <div
                key={item}
                className="bg-white px-4 py-4 border border-gray-100 rounded flex items-center justify-center gap-3"
              >
                <div className="basis-[40px]">
                  <div className="h-6 rounded w-full bg-gray-100 animate-pulse"></div>
                </div>
                <div className="basis-[80px]">
                  <div className="h-6 rounded w-full bg-gray-100 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="h-6 rounded w-full bg-gray-100 animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </>
      )}
      {/* Failed State */}
      {state.status == TodoSyncStatus.FETCHED_FAILED && (
        <>
          <div className="text-center py-20">
            <div className="text-red-400 text-xl flex items-center justify-center">
              <XCircleIcon className="size-20 text-red-300" />
            </div>
            <p className="text-red-400 text-lg py-4">
              Something went wrong, Please try again.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskLists;
