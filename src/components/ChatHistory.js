import  Button  from "./ui/Button";
import { Send } from "lucide-react";

export default function ChatHistory() {
  return (
    <div className="flex flex-col flex-1 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">Chat History</h3>
        <Button className="bg-gray-200">LineOff And Estimate</Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 slim-scrollbar">
        <div className="text-gray-400">No messages yet</div>
      </div>
      <div className="border-t p-2 flex items-center">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="flex-1 p-2 border rounded-l-lg h-10"
        />
        <Button className="bg-blue-500 text-white rounded-r-lg h-10 flex items-center justify-center px-3">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}