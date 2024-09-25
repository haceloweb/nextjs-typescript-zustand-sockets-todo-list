import React from "react";
import useTodoStore from "../../store/todo";
import { useSocket } from "../../context/SocketContext";

export default function TodoAdd() {
  const todoStore = useTodoStore((state) => state);
  const socket = useSocket();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (socket) {
      if (todoStore.newTodoTask !== "") {
        socket.emit("addTodo", todoStore.newTodoTask);
      }
      todoStore.clearTodoTask();
    }
  };

  return (
    <form className="py-5 flex gap-5" onSubmit={handleSubmit}>
      <input
        className="py-2 px-4 border-solid outline-none border-gray-300 border flex-1 rounded"
        type="text"
        placeholder="Add a new to do task..."
        value={todoStore.newTodoTask}
        onChange={(e) => todoStore.setNewTodo(e.target.value)}
      />
      <input
        type="submit"
        value="Add"
        className="flex-none rounded px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-amber-700"
      />
    </form>
  );
}
