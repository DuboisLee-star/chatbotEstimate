import UserInfo from "./UserInfo";
import ChatbotList from "./ChatbotList";
import ChatHistory from "./ChatHistory";

export default function MainBoard({ user, setUser }) {
  return (
    <div className="flex flex-grow">
      <div className="w-1/4 bg-white p-4 shadow-md">
        <UserInfo user={user} />
        <ChatbotList />
      </div>
      <div className="flex-1 flex flex-col p-4 relative">
        <ChatHistory />
      </div>
    </div>
  );
}
