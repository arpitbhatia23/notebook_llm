"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChatInput } from "./index";
import { UploadCloud } from "lucide-react";
import UploadPopUp from "./UploadPopUp";
import { useUploadStore } from "@/store/upload.store";
import useMessageStore from "@/store/message.store";

const MessageBox = () => {
  const [isUploadPopUp, setIsUploadPopUp] = useState(false);
  const { file, loadFile } = useUploadStore();
  const { messages } = useMessageStore();

  useEffect(() => {
    loadFile();
  }, [loadFile]);

  const onClose = () => setIsUploadPopUp(!isUploadPopUp);

  return (
    <section className=" flex items-center justify-center bg-gray-50">
      <Card className="w-full h-screen  flex flex-col shadow-lg rounded-none p-0 border border-gray-200">
        {/* Header */}
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            💬 Chat
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 overflow-y-auto px-4 py-6">
          {file ? (
            messages && messages.length > 0 ? (
              <div className="flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "ml-auto bg-blue-500 text-white rounded-br-none"
                        : "mr-auto bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center text-lg">
                No messages yet. Start chatting below!
              </p>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <UploadCloud
                size={70}
                className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={onClose}
              />
              <span className="text-xl font-medium text-gray-600">
                Add source to chat
              </span>
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="border-t px-4 py-3 bg-white sticky bottom-0">
          <ChatInput />
        </CardFooter>

        {/* Popup */}
        {isUploadPopUp && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-2/4 h-3/4 relative">
              <UploadPopUp onClose={onClose} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
};

export default MessageBox;
