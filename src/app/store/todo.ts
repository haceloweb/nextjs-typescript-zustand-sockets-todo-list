import { create } from "zustand";
import { persist } from "zustand/middleware";

// Standard interface and functions
export interface Todo {
  id: number;
  task: string;
  done: boolean;
  owner?: string;
}

// Zustand implementation
type Store = {
  todos: Todo[];
  newTodoTask: string;
  setTodos: (todos: Todo[]) => void;
  clearTodoTask: () => void;
  setNewTodo: (newTodoTask: string) => void;
};

const useTodoStore = create<Store>()(
  persist(
    (set): Store => ({
      todos: [],
      newTodoTask: "",
      setTodos: (todos: Todo[]) =>
        set((state) => ({
          ...state,
          todos,
        })),
      setNewTodo: (newTodoTask: string) =>
        set((state) => ({
          ...state,
          newTodoTask,
        })),
      clearTodoTask: () =>
        set((state) => ({
          ...state,
          newTodoTask: "",
        })),
    }),
    {
      name: "todoData",
    }
  )
);

export default useTodoStore;
