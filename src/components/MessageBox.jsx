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

const MessageBox = () => {
  const [isUploadPopUp, setIsUploadPopUp] = useState(false);
  const onClose = () => {
    console.log("click");
    setIsUploadPopUp(!isUploadPopUp);
  };

  const { file, loadFile } = useUploadStore();

  useEffect(() => {
    loadFile();
  }, [loadFile]);
  return (
    <section>
      <Card className={"rounded-none max-h-screen p-10"}>
        <CardHeader>
          <CardTitle className={"text-3xl"}> chat </CardTitle>
        </CardHeader>
        <CardContent className={"h-screen"}>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            {file ? (
              <span>you can start chat</span>
            ) : (
              <>
                <UploadCloud
                  size={70}
                  className="text-blue-500"
                  onClick={() => onClose()}
                />
                <span className="text-2xl text-gray-600">
                  Add source to chat
                </span>
              </>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <ChatInput />
        </CardFooter>
        {isUploadPopUp && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-2/4 h-3/4 relative ">
              <UploadPopUp onClose={onClose} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
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
