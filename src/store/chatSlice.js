import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    user: {
      username: "",
      loginTime: null,
    },
    selectedBot: null,
    conversations: {},
    userRatings: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user.username = action.payload.username;
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
  },
});

export const { setUser, setSelectedBot, addMessage, setUserRating } = chatSlice.actions;
export default chatSlice.reducer;