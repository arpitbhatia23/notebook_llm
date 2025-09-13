"use client";
import React, { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { useUploadStore } from "@/store/upload.store";
import { FileIcon, UploadCloud, X } from "lucide-react";

const SideBar = () => {
  const { file, loadFile, deleteFile } = useUploadStore();

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
          <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {/* File Icon */}
            <FileIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />

            {/* File Info */}
            <div className="flex-1 min-w-0">
              {/* File name with ellipsis */}
              <div className="flex items-center justify-between">
                <span
                  className="text-base font-medium text-gray-900 dark:text-gray-100 truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px]"
                  title={file.name} // Tooltip to show full name on hover
                >
                  {file.name}
                </span>
                <button
                  onClick={deleteFile}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* File type & size */}
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
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
