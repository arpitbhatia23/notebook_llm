"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const ChatInput = () => {
  const [qestions, setquestions] = useState("");

  const handlesubmit = async (e) => {
    try {
      const res = axios.post("/api/query", { query: qestions });
      console.log((await res).data.data);
      setquestions("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center w-full border-2 rounded-lg p-2 gap-2 mt-4">
      <Input
        type="text"
        placeholder="Type a message..."
        value={qestions}
        onChange={(e) => setquestions(e.target.value)}
        className=" flex-1 border-none focus:ring-0 focus:outline-none focus:rounded-none focus:border-none focus-visible:border-none focus-visible:ring-0 shadow-none"
      />
      <Button
        type="submit"
        className="group p-2 hover:bg-gray-100 transition"
        onClick={handlesubmit}
      >
        <Send className="w-5 h-5 text-gray-100 group-hover:text-gray-900" />
      </Button>
    </div>
  );
};

export default ChatInput;
