export default function ChatbotList() {
  const chatbots = [
    { name: "Alice", avatar: "😊" },
    { name: "Michael", avatar: "😎" },
    { name: "Sophia", avatar: "😉" },
    { name: "David", avatar: "😁" },
    { name: "Emma", avatar: "🤗" },
    { name: "James", avatar: "😃" },
    { name: "Olivia", avatar: "😇" },
    { name: "William", avatar: "😏" },
    { name: "Isabella", avatar: "🥰" }
  ];
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Waitors</h3>
      <div>
        {chatbots.map((bot, i) => (
          <div
            key={i}
            className="p-2 border-b flex items-center space-x-2 hover:bg-gray-200 cursor-pointer"
          >
            <span className="text-xl">{bot.avatar}</span>
            <span>{bot.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}