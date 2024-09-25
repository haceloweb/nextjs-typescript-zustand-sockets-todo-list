import { useEffect } from "react";
import TodoList from "./todo/TodoList";
import UserList from "./user/UserList";
import UserLobby from "./user/UserLobby";
import useUserStore from "../store/user";
import useTodoStore from "../store/todo";
import { useSocket } from "../context/SocketContext";

export default function Dashboard() {
  const userStore = useUserStore((state) => state);
  const todoStore = useTodoStore((state) => state);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("loadTodos", (data) => todoStore.setTodos(data));
      socket.on("loadUsers", (data) => userStore.setUsers(data));
    }
  }, [socket]);

  return (
    <div className="flex items-center justify-center w-full p-8 flex-col">
      {userStore.currentUserId !== "" ? (
        <>
          <TodoList />
          <UserList />
        </>
      ) : (
        <UserLobby />
      )}
    </div>
  );
}
