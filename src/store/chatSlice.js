import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    user: {
      username: "",
      avatar: "",
      loginTime: null,
    },
    selectedBot: null,
    conversations: {},
    userRatings: {},
    chatbotList: ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Helen", "Isaac"],
  },
  reducers: {
    setUser: (state, action) => {
      state.user.username = action.payload.username;
      state.user.avatar = action.payload.avatar;
      state.user.loginTime = action.payload.loginTime;
    },
    setSelectedBot: (state, action) => {
      state.selectedBot = action.payload;
    },
    addMessage: (state, action) => {
      const { botName, message } = action.payload;
      if (!state.conversations[botName]) {
        state.conversations[botName] = [];
      }
      state.conversations[botName].push(message);
    },
    setUserRating: (state, action) => {
      const { botName, rating } = action.payload;
      state.userRatings[botName] = rating;
    },
    removeBotConversation: (state, action) => {
      const { botName } = action.payload;
      delete state.conversations[botName];
    },
    setChatbotList: (state, action) => {
      state.chatbotList = action.payload;
    },
    lineOffBot: (state) => {
      if (state.selectedBot) {
        delete state.conversations[state.selectedBot]; // Remove conversation
        state.chatbotList = state.chatbotList.filter(bot => bot !== state.selectedBot); // Remove bot from list
        state.selectedBot = null; // Remove selected bot
        console.log('here delete bot from list', state.chatbotList);
      }
    },
  },
});

export const { setUser, setSelectedBot, addMessage, setUserRating, removeBotConversation, setChatbotList, lineOffBot } = chatSlice.actions;
export default chatSlice.reducer;
