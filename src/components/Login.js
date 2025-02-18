// components/Login.js
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Login({ setUser }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const avatars = ["🧑", "👩", "👨", "🧔", "👱", "🧕", "🧓", "👶", "👮", "🎅"];

  const handleLogin = () => {
    if (name && avatar) setUser({ name, avatar });
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