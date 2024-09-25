import { create } from "zustand";
import { persist } from "zustand/middleware";

// Standard interface and functions
export interface User {
  id: string;
  name: string;
}

// Zustand implementation
type Store = {
  users: User[];
  newUserName: string;
  currentUserId: string;
  currentUserName: string;
  setUsers: (users: User[]) => void;
  logIn: (id: string) => void;
  logOut: () => void;
  setNewUser: (newUserName: string) => void;
};

const useUserStore = create<Store>()(
  persist(
    (set): Store => ({
      users: [],
      newUserName: "",
      currentUserId: "",
      currentUserName: "",
      setUsers: (users: User[]) =>
        set((state) => ({
          ...state,
          users: users,
        })),
      logOut: () =>
        set((state) => ({
          ...state,
          currentUserName: "",
          currentUserId: "",
        })),
      setNewUser: (newUserName: string) =>
        set((state) => ({
          ...state,
          newUserName,
        })),
      logIn: (id: string) => {
        set((state) => ({
          ...state,
          currentUserName: state.newUserName,
          currentUserId: id,
          newUserName: "",
        }));
      },
    }),
    {
      name: "userData",
    }
  )
);

export default useUserStore;
