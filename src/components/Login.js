// components/Login.js
import { useState } from "react";
import { useDispatch } from "react-redux";  // Import useDispatch
import { setUser } from "../store/chatSlice"; // Import setUser action
import Button from "./ui/Button";

export default function Login() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const avatars = ["🧑", "👩", "👮", "🎅", "👨", "🧔", "👱"];

  const dispatch = useDispatch(); // Initialize useDispatch

  const handleLogin = () => {
    if (name && avatar) {
      const loginTime = new Date().toISOString(); // Get current time
      dispatch(setUser({ username: name, avatar, loginTime })); // Dispatch setUser action
    }
  };

  return (
    <div className="m-auto p-6 bg-white rounded-xl shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex gap-2 mb-4">
        {avatars.map((a, i) => (
          <button
            key={i}
            onClick={() => setAvatar(a)}
            className={`p-2 border rounded ${avatar === a ? "bg-blue-300" : ""}`}
          >
            {a}
          </button>
        ))}
      </div>
      <Button onClick={handleLogin} className="w-full">Enter</Button>
    </div>
  );
}
