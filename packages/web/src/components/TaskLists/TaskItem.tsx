import React from "react";
import PriorityBadge from "./PriorityBadge";
import { useTodos, type Todo } from "../../contexts/Todo.provider";
import "./CustomCheckbox.css";
import cx from "classnames";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";

interface TaskItemProps {
  item: Todo;
}

const TaskItem: React.FC<TaskItemProps> = ({ item }) => {
  const { state, dispatch } = useTodos();
  const onToggleCompleted = () => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: item,
    });
  };

  const onRemoveItem = () => {
    dispatch({ type: "REMOVE_TODO", payload: item });
  };

  return (
    <div
      className={cx(
        "relative px-4 py-4 border border-gray-100 rounded flex items-center justify-center gap-3 transition",
        {
          "bg-white opacity-40 border-dashed border-gray-300": item.isCompleted,
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
        <div>{item.text}</div>
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
  );
};

export default TaskItem;
