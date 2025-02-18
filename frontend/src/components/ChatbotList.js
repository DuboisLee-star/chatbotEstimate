import { useSelector, useDispatch } from "react-redux";
import { setSelectedBot } from "../store/chatSlice";

const getGenderIcon = (name) => {
  const maleNames = ["Bob", "Charlie", "David", "Frank", "Isaac"];
  return maleNames.includes(name) ? "👨" : "👩"; // Male or female icon
};

export default function ChatbotList() {
  const chatbotList = useSelector((state) => state.chat.chatbotList);
  const selectedBot = useSelector((state) => state.chat.selectedBot);
  const dispatch = useDispatch();

  return (
    <div className="mt-3 space-y-0">
      {chatbotList.map((bot) => (
        <div
          key={bot}
          className={`flex items-center p-2 cursor-pointer ${selectedBot === bot ? "bg-blue-500 text-white" : "bg-gray-200"} 
          hover:bg-blue-300 hover:text-white transition-all duration-200 ease-in-out`}
          onClick={() => dispatch(setSelectedBot(bot))}
        >
          <span className="text-2xl mr-3">{getGenderIcon(bot)}</span>
          <span className="flex-grow">{bot}</span>
        </div>
      ))}
    </div>
  );
}
