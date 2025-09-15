"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClockFading, Send } from "lucide-react";
import useMessageStore from "@/store/message.store";
import { useCompletion } from "@ai-sdk/react";

const ChatInput = () => {
  const [question, setQuestion] = useState("");
  const { addMessage, setCompletetion, setloading, loading } =
    useMessageStore();

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/query",
    body: { query: question },
    onFinish: (prompt, completion) => {
      setloading(false);
      console.log("set laoding false");
      setCompletetion(null);
      addMessage({ role: "assitant", content: completion });
    },
  });

  useEffect(() => {
    if (completion) {
      setloading(false);
      setCompletetion(completion);
    }
  }, [completion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === "") return;
    addMessage({ role: "user", content: question });
    setloading(true);
    console.log("seting lading ture ", loading);
    complete();
    setQuestion("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full border rounded-xl p-2 gap-2 bg-white shadow-sm mt-4"
    >
      <Input
        type="text"
        placeholder="Type your message..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className=" flex-1 border-none focus:ring-0 focus:outline-none focus:rounded-none focus:border-none focus-visible:border-none focus-visible:ring-0 shadow-none"
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
