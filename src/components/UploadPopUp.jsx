"use client";
import React, { useEffect } from "react";
import { StyledDropZone } from "react-drop-zone";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "react-drop-zone/dist/styles.css";
import { useUploadStore } from "@/store/upload.store";

const UploadPopUp = ({ onClose }) => {
  const { file, setFile, uploadFile, loadFile } = useUploadStore();

  const handleUpload = async () => {
    await uploadFile(
      () => {
        console.log("File uploaded successfully!");
        onClose();
      },
      (err) => console.log("Upload error:", err)
    );
  };

  useEffect(() => {
    loadFile();
  }, [loadFile]);

  return (
    <Card className="flex flex-col rounded-none shadow-none border-none justify-center">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b pb-2">
        <CardTitle className="text-lg font-semibold">Upload Source</CardTitle>
        <span className="text-sm text-gray-400 italic">Notebook cell</span>
      </CardHeader>

      {/* Drop zone */}
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400 transition-colors">
          <StyledDropZone
            onDrop={(file) => setFile(file)}
            className="w-full h-full flex items-center justify-center text-gray-500"
          >
            {file ? file.name : "Click or drop your file here"}
          </StyledDropZone>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-end gap-3 border-t pt-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleUpload}>Upload</Button>
      </CardFooter>
    </Card>
  );
};

export default UploadPopUp;
