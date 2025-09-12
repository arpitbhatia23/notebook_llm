"use client";
import React, { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { useUploadStore } from "@/store/upload.store";
import { FileIcon, UploadCloud } from "lucide-react";

const SideBar = () => {
  const { file, loadFile } = useUploadStore();

  useEffect(() => {
    loadFile();
  }, [loadFile]);

  return (
    <Sidebar className="border-r bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <SidebarHeader className="p-4 text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100 border-b">
        📒 Notebook LLM
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 p-4 flex flex-col gap-4">
        {file ? (
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800  ">
            <FileIcon className="w-6 h-6 text-blue-500" />
            <div className="flex-1">
              <p className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
                {file.name}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {file.type} • {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
            <UploadCloud className="w-8 h-8 text-gray-500" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Notebook LLM has no context yet
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
