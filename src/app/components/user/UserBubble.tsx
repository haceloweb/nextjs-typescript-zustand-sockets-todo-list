"use client";
import { User } from "../../store/user";

interface UserProps {
  user: User;
}

export default function UserBubble(props: UserProps) {
  const user = props.user;

  return (
    <span className="rounded-lg inline-block bg-gray-100 py-2 px-4 mr-2">
      {user.name}
    </span>
  );
}
