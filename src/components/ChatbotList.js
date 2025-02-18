import { useSelector, useDispatch } from "react-redux";
import { setSelectedBot } from "../store/chatSlice";

const botNames = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Helen", "Isaac"];

export default function ChatbotList() {
  const selectedBot = useSelector((state) => state.chat.selectedBot);
  const dispatch = useDispatch();

  return (
    <div className="mt-4 space-y-2">
      {botNames.map((bot) => (
        <div 
          key={bot} 
          className={`p-2 cursor-pointer rounded-md ${selectedBot === bot ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
          onClick={() => dispatch(setSelectedBot(bot))}
        >
          {bot}
        </div>
      ))}
    </div>
  );
}