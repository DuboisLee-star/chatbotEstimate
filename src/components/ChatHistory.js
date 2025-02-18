import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";
import { Send } from "lucide-react";
import RatingModal from "./RatingModal"; // Import the modal

export default function ChatHistory() {
  const dispatch = useDispatch();
  const selectedBot = useSelector((state) => state.chat.selectedBot);
  const conversations = useSelector(
    (state) => (selectedBot ? state.chat.conversations[selectedBot] || [] : [])
  );
  const [message, setMessage] = useState("");
  const endOfMessagesRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const handleSend = () => {
    if (selectedBot && message.trim()) {
      dispatch(addMessage({ botName: selectedBot, message }));
      setMessage("");

      setTimeout(() => {
        dispatch(addMessage({ botName: selectedBot, message: "Hello" }));
      }, 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });

    if (conversations.length > 0) {
      setIsButtonDisabled(false);
    }
  }, [conversations]);

  // Open the modal when button is clicked
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">Chat History</h3>
        <Button
          onClick={handleButtonClick}
          className="bg-gray-200"
          disabled={isButtonDisabled}
        >
          LineOff And Estimate
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 slim-scrollbar">
        {selectedBot ? (
          conversations.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.startsWith("Hello") ? "justify-start" : "justify-end"} space-x-2`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${msg.startsWith("Hello") ? "bg-gray-200" : "bg-blue-500 text-white"}`}
              >
                {msg}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Select a chatbot to start conversation.</p>
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="border-t p-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border rounded-l-lg h-10"
        />
        <Button
          onClick={handleSend}
          className="bg-blue-500 text-white rounded-r-lg h-10 flex items-center justify-center px-3"
        >
          <Send size={18} />
        </Button>
      </div>

      {/* Rating Modal */}
      <RatingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} botName={selectedBot} />
    </div>
  );
}
