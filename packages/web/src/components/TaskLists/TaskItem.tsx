import React, { useState } from "react";
import PriorityBadge from "./PriorityBadge";
import { useTodos, type Todo } from "../../contexts/Todo.provider";
import "./CustomCheckbox.css";
import cx from "classnames";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface TaskItemProps {
  item: Todo;
}

type TaskInputs = {
  text: string;
  priorityId: number;
};

const TaskItem: React.FC<TaskItemProps> = ({ item }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskInputs>();

  const [isEdit, setIsEdit] = useState(false);
  const { dispatch } = useTodos();
  const onToggleCompleted = () => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: item,
    });
  };

  const onRemoveItem = () => {
    dispatch({ type: "REMOVE_TODO", payload: item });
  };

  const onStartEdit = () => {
    reset({
      text: item.text,
    });
    setIsEdit(true);
  };

  const onSubmit: SubmitHandler<TaskInputs> = (data) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        ...item,
        text: data.text,
      },
    });

    reset({
      text: data.text,
    });

    setIsEdit(false);
  };

  const onCancelEdit = () => {
    reset({
      text: item.text,
    });

    setIsEdit(false);
  }

  const onSubmitError = () => {
    // Text is required
    if(errors?.text?.type === 'required') {
      toast.error("Please type your task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <div
        className={cx(
          "relative px-4 py-4 border border-gray-100 rounded flex items-center justify-center gap-3 transition",
          {
            "bg-white opacity-40 border-dashed border-gray-300":
              item.isCompleted,
            "bg-white opacity-100 border-solid": !item.isCompleted,
          }
        )}
      >
        <div className="basis-[40px]">
          <div className="checkbox-wrapper">
            <input
              className="inp-cbx"
              id={`cbx-${item.uuid}`}
              type="checkbox"
              checked={item.isCompleted}
              onClick={onToggleCompleted}
              style={{ display: "none" }}
            />
            <label className="cbx" htmlFor={`cbx-${item.uuid}`}>
              <span>
                <svg width="12px" height="9px" viewBox="0 0 12 9">
                  <polyline points="1 5 4 8 11 1"></polyline>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <div className="basis-[100px]">
          <div className="w-full  flex items-center justify-center">
            <PriorityBadge priorityId={item.priorityId} />
          </div>
        </div>
        <div className="flex-1">
          {!isEdit && (
            <div className="cursor-text px-2 py-1 w-full" onClick={onStartEdit}>
              {item.text}
            </div>
          )}
          {isEdit && (
            <div className="w-full relative">
              <input
                type="text"
                className="border-none px-2 py-1 bg-blue-50 w-full"
                {...register("text", { required: true })}
              />
              <div className="absolute z-1 right-0 top-0 h-full flex items-center justify-center px-2 gap-2">
                <button type="submit">
                  <CheckIcon className="size-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                </button>
                <button type="button" onClick={onCancelEdit}>
                  <XMarkIcon className="size-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute left-0 top-1/2 w-full px-6">
          <div
            className={cx("h-[1px] bg-gray-500 opacity-20", {
              [`w-full`]: item.isCompleted,
              [`w-0`]: !item.isCompleted,
            })}
          ></div>
        </div>
        <Menu as="div" className="relative">
          <div className="flex items-center justify-center">
            <MenuButton className="cursor-pointer">
              <EllipsisVerticalIcon
                aria-hidden="true"
                className="size-5 text-gray-300"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <div
                  onClick={onRemoveItem}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  Remove
                </div>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </form>
  );
};

export default TaskItem;
