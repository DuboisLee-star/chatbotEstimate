import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { useState } from "react";
import Button from "./ui/Button";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import RatingModal from "./RatingModal"; 

export default function ChatHistory() {
  const dispatch = useDispatch();
  const selectedBot = useSelector((state) => state.chat.selectedBot);
  const conversations = useSelector(
    (state) => (selectedBot ? state.chat.conversations[selectedBot] || [] : [])
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isButtonDisabled = !selectedBot || conversations.length === 0;

  const handleSendMessage = (message) => {
    if (selectedBot && message.trim()) {
      dispatch(addMessage({ botName: selectedBot, message }));
      
      setTimeout(() => {
        dispatch(addMessage({ botName: selectedBot, message: "Hello" }));
      }, 500);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">Chat History</h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-200"
          disabled={isButtonDisabled}
        >
          LineOff And Estimate
        </Button>
      </div>

      <ChatMessages selectedBot={selectedBot} conversations={conversations} />
      <ChatInput onSendMessage={handleSendMessage} />

      <RatingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} botName={selectedBot} />
    </div>
  );
}
