import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setUserRating, removeBotConversation } from '../store/chatSlice';
import { setUserRating} from '../store/chatSlice';

const RatingModal = ({ isOpen, onClose, botName }) => {
  const [rating, setRating] = useState(0); // Rating between 0 and 10
  const dispatch = useDispatch();

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleConfirm = () => {
    if (rating > 0) {
      dispatch(setUserRating({ botName, rating }));
      // dispatch(removeBotConversation()); // Remove only the selected bot's conversation
      onClose(); // Close the modal
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
              className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${rating > 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
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
