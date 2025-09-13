// store/message.store.js
import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],

  // Add new message
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateLastMessage: (content) =>
    set((state) => {
      const updated = [...state.messages];
      if (updated.length > 0) {
        updated[updated.length - 1].content = content;
      }
      return { messages: updated };
    }),

  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
