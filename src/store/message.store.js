// store/message.store.js
import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  completetion: null,
  loading: false,
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

  setloading: (loading) => set(() => ({ loading: loading })),
  setCompletetion: (completetion) =>
    set(() => ({
      completetion: completetion,
    })),

  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
