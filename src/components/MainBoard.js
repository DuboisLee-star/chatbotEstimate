import UserInfo from "./UserInfo";
import ChatbotList from "./ChatbotList";
import ChatHistory from "./ChatHistory";
import  Button  from "./ui/Button";

export default function MainBoard({ user, setUser }) {
  const handleLogout = () => setUser(null);

  return (
    <div className="flex flex-grow">
      <div className="w-1/4 bg-white p-4 shadow-md">
        <UserInfo user={user} />
        <ChatbotList />
      </div>
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-end">
          <Button onClick={handleLogout} className="bg-red-500 text-white">Disconnect</Button>
        </div>
        <ChatHistory />
      </div>
    </div>
  );
}
