import { v4 as uuidv4 } from 'uuid';

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

export const TodoSyncStatus = {
  INIT: 0,
  FETCHING: 1,
  FETCHED_SUCCESS: 2,
  FETCHED_FAILED: 3,
  SYNCING: 4,
  SYNCED_SUCCESS: 5,
  SYNCED_FAILED: 6,
};

export interface Todo {
  text: string;
  uuid?: string;
  priorityId?: number;
  isCompleted?: boolean;
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
    | "TODO_SYNCING"
    | "TODO_SYNCING_SUCCESS"
    | "TODO_SYNCING_FAILED"
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
}>({ state: { todos: [], status: TodoSyncStatus.INIT }, dispatch: () => null });

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
    case "TODO_SYNCING":
      return { status: TodoSyncStatus.SYNCING, todos: [...state.todos] };
    case "TODO_SYNCING_SUCCESS":
      return { status: TodoSyncStatus.SYNCED_SUCCESS, todos: [...state.todos] };
    case "TODO_SYNCING_FAILED":
      return { status: TodoSyncStatus.SYNCED_FAILED, todos: [...state.todos] };
    case "ADD_TODO":
      return { todos: [
        ...state.todos,
        {
          uuid: uuidv4(),
          ...action.payload,
        } as Todo
      ] };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.uuid === action.payload?.uuid
            ? { ...todo, isCompleted: !todo.isCompleted }
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

  // Init Load Data
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "TODO_FETCHING" });
      setTimeout(() => {
        const mockTodos: Todo[] = [
          {
            uuid: uuidv4(),
            text: "Hello World 1",
            priorityId: 1,
            isCompleted: false,
          },
          {
            uuid: uuidv4(),
            text: "Hello World 2",
            priorityId: 2,
            isCompleted: false,
          },
          {
            uuid: uuidv4(),
            text: "Hello World 3",
            priorityId: 3,
            isCompleted: true,
          },
          {
            uuid: uuidv4(),
            text: "Hello World 4",
            priorityId: 4,
            isCompleted: true,
          }
        ]
        dispatch({ type: "TODO_FETCHED_SUCCESS", todos: mockTodos });
      }, 1000);
    };
    fetchData();
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
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
