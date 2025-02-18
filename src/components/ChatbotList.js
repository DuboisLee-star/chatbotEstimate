import { useSelector, useDispatch } from "react-redux";
import { setSelectedBot } from "../store/chatSlice";

const botNames = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Helen", "Isaac"];

const getGenderIcon = (name) => {
  // Add simple logic to determine male or female based on names
  const maleNames = ["Bob", "Charlie", "David", "Frank", "Isaac"];
  return maleNames.includes(name) ? "👨" : "👩"; // Male icon for male names, female for others
};

export default function ChatbotList() {
  const selectedBot = useSelector((state) => state.chat.selectedBot);
  const dispatch = useDispatch();

  return (
    <div className="mt-3 space-y-0"> {/* Removed space-y-2 for no gaps */}
      {botNames.map((bot) => (
        <div
          key={bot}
          className={`flex items-center p-2 cursor-pointer ${selectedBot === bot ? "bg-blue-500 text-white" : "bg-gray-200"} 
          hover:bg-blue-300 hover:text-white transition-all duration-200 ease-in-out`}
          onClick={() => dispatch(setSelectedBot(bot))}
        >
          {/* Gender Icon */}
          <span className="text-2xl mr-3">{getGenderIcon(bot)}</span> 
          
          <span className="flex-grow">{bot}</span> {/* Stretch the bot names */}
        </div>
      ))}
    </div>
  );
}
