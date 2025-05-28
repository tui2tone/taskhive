import { v4 as uuidv4 } from "uuid";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import * as service from "../services/todo";
import toast from "react-hot-toast";

export const TodoSyncStatus = {
  INIT: 0,
  FETCHING: 1,
  FETCHED_SUCCESS: 2,
  FETCHED_FAILED: 3,
};

export interface Todo {
  text: string;
  uuid?: string;
  priorityId?: number;
  isCompleted?: boolean;
}

export interface TodoFilter {
  priorityId?: number;
}

interface TodoState {
  status?: number;
  todos: Todo[];
}

interface TodoAction {
  type:
    | "TODO_FETCHING"
    | "TODO_FETCHED_SUCCESS"
    | "TODO_FETCHED_FAILED"
    | "ADD_TODO"
    | "TOGGLE_TODO"
    | "UPDATE_TODO"
    | "REMOVE_TODO";
  payload?: Todo;
  todos?: Todo[];
}

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  addTodo: (dto: Todo) => void;
  updateTodo: (dto: Todo) => void;
  toggleTodo: (dto: Todo) => void;
  deleteTodo: (dto: Todo) => void;
  setFilter: (dto: TodoFilter) => void;
  filteredTodos: Todo[];
}>({
  state: { todos: [], status: TodoSyncStatus.INIT },
  dispatch: () => null,
  addTodo: () => {},
  updateTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  setFilter: () => {},
  filteredTodos: [],
});

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "TODO_FETCHING":
      return { status: TodoSyncStatus.FETCHING, todos: [] };
    case "TODO_FETCHED_SUCCESS":
      return {
        status: TodoSyncStatus.FETCHED_SUCCESS,
        todos: [...(action.todos || [])],
      };
    case "TODO_FETCHED_FAILED":
      return { status: TodoSyncStatus.FETCHED_FAILED, todos: [] };
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          {
            ...action.payload,
          } as Todo,
        ],
      };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.uuid === action.payload?.uuid
            ? { ...todo, ...action.payload }
            : todo
        ),
      };
    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.uuid === action.payload?.uuid
            ? { ...todo, ...action.payload }
            : todo
        ),
      };
    case "REMOVE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.uuid !== action.payload?.uuid),
      };
    default:
      return state;
  }
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [filter, setFilter] = useState<TodoFilter>({
    priorityId: 0,
  });

  const filteredTodos = useMemo(() => {
    return state.todos?.filter((m) => {
      if (filter.priorityId !== 0) {
        return m?.priorityId === filter.priorityId;
      } else {
        return true;
      }
    });
  }, [filter, state.todos]);

  // Init Load Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "TODO_FETCHING" });
        // Add Timeout for Show Loading State
        await new Promise((resolve) => setTimeout(resolve, 250));
        const results = await service.getTodos();
        dispatch({ type: "TODO_FETCHED_SUCCESS", todos: results });
      } catch (error) {
        dispatch({ type: "TODO_FETCHED_FAILED" });
      }
    };
    fetchData();
  }, []);

  const addTodo = async (data: Todo) => {
    try {
      const newTodo = {
        uuid: uuidv4(),
        text: data.text,
        priorityId: data.priorityId,
        isCompleted: false,
      };
      await service.createTodo(newTodo);
      dispatch({
        type: "ADD_TODO",
        payload: newTodo,
      });
    } catch (error) {
      toast.error(`Something went wrong, Please try again!`);
    }
  };

  const updateTodo = async (data: Todo) => {
    try {
      await service.updateTodo(data);
      dispatch({
        type: "UPDATE_TODO",
        payload: data,
      });
    } catch (error) {
      toast.error(`Something went wrong, Please try again!`);
    }
  };

  const toggleTodo = async (data: Todo) => {
    try {
      const toggledTodo = {
        ...data,
        isCompleted: !data.isCompleted,
      } as Todo;
      await service.updateTodo(toggledTodo);
      dispatch({
        type: "TOGGLE_TODO",
        payload: toggledTodo,
      });
    } catch (error) {
      toast.error(`Something went wrong, Please try again!`);
    }
  };
  const deleteTodo = async (data: Todo) => {
    try {
      await service.deleteTodo(data);
      dispatch({
        type: "REMOVE_TODO",
        payload: data,
      });
      toast.success(`Todo is deleted.`);
    } catch (error) {
      toast.error(`Something went wrong, Please try again!`);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
        setFilter,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
