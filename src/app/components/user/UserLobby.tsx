import UserJoin from "./UserJoin";

export default function UserLobby() {
  return (
    <div className="w-full max-w-[760px]">
      <h2 className="mb-5 text-xl">Shared Todo List</h2>
      <p className="mb-2">
        Welcome to our shared to do list handler. Please let us know your name
        before you can colaborate.
      </p>
      <UserJoin />
    </div>
  );
}
