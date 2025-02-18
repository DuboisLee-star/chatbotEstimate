import { useSelector } from "react-redux"; // Import useSelector to access the Redux store

export default function UserInfo() {
  // Access the user state from Redux store
  const user = useSelector((state) => state.chat.user);

  return (
    <div className="flex items-center space-x-3 p-4 border-b">
      <span className="text-3xl">{user.avatar}</span>
      <span className="text-lg font-semibold">{user.username}</span>
    </div>
  );
}