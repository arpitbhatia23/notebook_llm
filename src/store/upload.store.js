import { create } from "zustand";
import axios from "axios";

export const useUploadStore = create((set) => ({
  file: null,

  loadFile: () => {
    console.log(typeof window);
    if (typeof window !== "undefined") {
      const storedFile = localStorage.getItem("uploadedFile");
      if (storedFile) {
        set({ file: JSON.parse(storedFile) });
      }
    }
  },

  setFile: (file) => {
    const fileData = file
      ? { name: file.name, type: file.type, size: file.size }
      : null;

    if (typeof window !== "undefined") {
      if (fileData) {
        localStorage.setItem("uploadedFile", JSON.stringify(fileData));
      } else {
        localStorage.removeItem("uploadedFile");
      }
    }

    set({ file });
  },

  uploadFile: async (onSuccess, onError) => {
    try {
      const { file } = useUploadStore.getState();
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData);

      if (response.status === 200) {
        if (onSuccess) onSuccess(response.data);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      if (onError) onError(error);
    }
  },
}));
