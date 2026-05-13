"use client";

import { useState } from "react";
import { uploadMediaAsset } from "@/services/admin/media/media.api";

export const useMediaUpload = () => {
  const [activeUploads, setActiveUploads] = useState(0);
  const [lastError, setLastError] = useState("");

  const uploadMedia = async (options) => {
    setActiveUploads((count) => count + 1);
    setLastError("");

    try {
      return await uploadMediaAsset(options);
    } catch (error) {
      const message = error?.message || "Upload failed.";
      setLastError(message);
      throw new Error(message);
    } finally {
      setActiveUploads((count) => Math.max(0, count - 1));
    }
  };

  return {
    uploadMedia,
    isUploading: activeUploads > 0,
    lastError,
  };
};
