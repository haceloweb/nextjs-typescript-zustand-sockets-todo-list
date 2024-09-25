import { useSocket } from "../../context/SocketContext";
import useUserStore from "../../store/user";
import UserBubble from "./UserBubble";

export default function UserList() {
  const userStore = useUserStore((state) => state);
  const socket = useSocket();

  return (
    <div className="flex justify-between w-full max-w-[760px] pt-5">
      <div className="flex items-center">
        <span>You joined as: {userStore.currentUserName}</span>
        <button
          className="ml-2 flex-none rounded px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-gray-200"
          onClick={() => {
            if (socket) {
              socket.emit("removeUser", userStore.currentUserId);
              userStore.logOut();
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
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center">
        <span>Collaborators:</span>
        <ul className="flex ml-2 items-center">
          {userStore.users.map((user, index) => {
            return userStore.currentUserId !== user.id ? (
              <li key={user.id}>
                <UserBubble user={user}></UserBubble>
              </li>
            ) : (
              ""
            );
          })}
        </ul>
      </div>
    </div>
  );
}
