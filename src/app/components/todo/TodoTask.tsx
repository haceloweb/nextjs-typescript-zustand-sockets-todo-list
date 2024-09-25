"use client";
import useTodoStore from "../../store/todo";
import { Todo } from "../../store/todo";
import useUserStore from "../../store/user";
import { useSocket } from "../../context/SocketContext";

interface TaskProps {
  task: Todo;
}

export default function TodoTask(props: TaskProps) {
  const todoStore = useTodoStore((state) => state);
  const userStore = useUserStore((state) => state);
  const socket = useSocket();
  const task = props.task;

  return (
    <div className="flex items-center gap-5">
      <input
        className="flex-none"
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          if (socket) {
            let owner = userStore.currentUserName
              ? userStore.currentUserName
              : "";
            socket.emit("updateTodo", {
              id: task.id,
              owner: owner,
              done: !task.done,
            });
          }
        }}
      />
      <p className="flex-1 ">
        <span className={task.done ? "line-through" : ""}>{task.task}</span>{" "}
        <span>{task.done ? "(Completed by " + task.owner + ")" : ""}</span>
      </p>
      <button
        className="flex-none rounded px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-gray-200"
        onClick={() => {
          if (socket) {
            socket.emit("removeTodo", task.id);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </div>
  );
}
