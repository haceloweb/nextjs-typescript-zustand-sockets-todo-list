"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "../store/user";
import { Todo } from "../store/todo";

interface ServerToClientEvents {
  loadTodos: (data: Todo[]) => void;
  loadUsers: (data: User[]) => void;
}

interface ClientToServerEvents {
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  addTodo: (task: string) => void;
  removeTodo: (id: number) => void;
  updateTodo: (data: { id: number; owner: string; done: boolean }) => void;
}

export const SocketContext = createContext<Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const socketIO = io("http://localhost:4000");
    setSocket(socketIO);
    return () => {
      socketIO.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
