"use client";
import TodoAdd from "./TodoAdd";
import TodoTask from "./TodoTask";
import useTodoStore from "../../store/todo";

export default function TodoList() {
  const todoStore = useTodoStore((state) => state);

  return (
    <div className="border-solid border-gray-300 border rounded-md w-full max-w-[760px]">
      <div className="border-solid border-gray-300 border-b py-5 px-8 bg-gray-100 font-bold text-gray-900">
        TO DO LIST:
      </div>
      <div className="border-solid border-gray-300 px-8">
        <ul>
          {todoStore.todos.map((task, index) => (
            <li key={task.id} className="pt-5">
              <TodoTask task={task}></TodoTask>
            </li>
          ))}
        </ul>
        <TodoAdd></TodoAdd>
      </div>
    </div>
  );
}
