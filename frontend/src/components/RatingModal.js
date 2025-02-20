import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRating, lineOffBot } from "../store/chatSlice";

const RatingModal = ({ isOpen, onClose, botName }) => {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  // Get user and conversation data from Redux
  const user = useSelector((state) => state.chat.user);
  const conversation = useSelector((state) =>
    botName ? state.chat.conversations[botName] || [] : []
  );

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleConfirm = async () => {
    if (rating > 0) {
      const record = {
        bot_name: botName,
        user: user.username, // Extract only the username
        conversation: conversation.join(" | "), // Convert array to a single string
        rating,
      };
      // console.log(record);
      try {
        // console.log("Payload being sent:", JSON.stringify(record));
        const response = await fetch("http://127.0.0.1:8000/saveRating/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });
  
        if (response.ok) {
          dispatch(setUserRating({ botName, rating }));
          // console.log(botName, rating);
          
          dispatch(lineOffBot()); // Remove the bot and conversation
          onClose(); // Close the modal
        } else {
          console.error("Failed to save data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-xl font-semibold mb-4">Rate the Bot's Consciousness</h2>
        
        <div className="flex justify-center mb-4">
          {[...Array(10)].map((_, index) => (
            <span
              key={index}
              className={`cursor-pointer text-2xl ${
                index < rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              rating > 0 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
            }`}
            onClick={handleConfirm}
            disabled={rating === 0}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
