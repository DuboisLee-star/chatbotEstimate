import { Provider } from "react-redux";
import store from "./store/store";
// import Button  from "./components/ui/Button";
// import { Send } from "lucide-react";
import Login from "./components/Login";
import MainBoard from "./components/MainBoard";
import { useSelector } from "react-redux";

function AppContent() {
  const user = useSelector((state) => state.chat.user.username);

  return (
    <div className="flex h-screen bg-gray-100">
      {!user ? <Login /> : <MainBoard />}
    </div>
  );
}

export default function ChatApp() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}