export default function ChatbotList() {
  const chatbotAvatars = ["🤖", "🦾", "💡", "🔮", "🛸"];
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Chatbots</h3>
      <div className="grid grid-cols-5 gap-2">
        {chatbotAvatars.map((bot, i) => (
          <div key={i} className="p-2 border rounded text-center">{bot}</div>
        ))}
      </div>
    </div>
  );
}