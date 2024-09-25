import React from "react";
import useUserStore from "../../store/user";
import { useSocket } from "../../context/SocketContext";

export default function UserEntry() {
  const userStore = useUserStore((state) => state);
  const socket = useSocket();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (socket) {
      const userId = socket.id as string;
      if (userId !== "" && userStore.newUserName !== "") {
        socket.emit("addUser", {
          id: userId,
          name: userStore.newUserName,
        });
      }
      userStore.logIn(userId);
    }
  };

  return (
    <form className="py-5 flex gap-5" onSubmit={handleSubmit}>
      <input
        className="py-2 px-4 border-solid outline-none border-gray-300 border flex-1 rounded"
        type="text"
        placeholder="Enter your name..."
        value={userStore.newUserName}
        onChange={(e) => userStore.setNewUser(e.target.value)}
      />
      <input
        type="submit"
        value="Enter"
        className="flex-none rounded px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase bg-amber-600 hover:bg-amber-700 focus:bg-amber-700 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-amber-700"
      />
    </form>
  );
}
