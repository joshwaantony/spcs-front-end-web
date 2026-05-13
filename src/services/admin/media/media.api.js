import api from "@/lib/admin-axios";
import { validateAssetFile } from "@/services/admin/media/media.constants";

const getUploadUrlFromResponse = (response) =>
  response?.data?.uploadUrl ||
  response?.data?.signedUrl ||
  response?.data?.url ||
  response?.uploadUrl ||
  response?.signedUrl ||
  response?.url ||
  "";

const getMediaIdFromResponse = (response) =>
  response?.data?.mediaId ||
  response?.data?.id ||
  response?.mediaId ||
  response?.id ||
  "";

const normalizeConfirmedMedia = (response) => response?.data || response || null;

export const generateMediaUploadUrl = async (payload) => {
  try {
    const res = await api.post("/admin/media/upload-url", payload);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to generate upload URL" };
  }
};

export const confirmMediaUpload = async (mediaId) => {
  try {
    const res = await api.post("/admin/media/confirm", { mediaId });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to confirm upload" };
  }
};

export const uploadFileToSignedUrl = async ({ uploadUrl, file, signal }) => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
    signal,
  });

  if (!response.ok) {
    throw new Error("File upload failed.");
  }

  return response;
};

export const uploadMediaAsset = async ({
  file,
  assetType,
  entityId,
  subEntityId,
  altText,
  signal,
}) => {
  validateAssetFile({ file, assetType });

  const uploadUrlResponse = await generateMediaUploadUrl({
    fileName: file.name,
    mimeType: file.type,
    fileSize: file.size,
    assetType,
    entityId,
    subEntityId,
    altText,
  });

  const uploadUrl = getUploadUrlFromResponse(uploadUrlResponse);
  const mediaId = getMediaIdFromResponse(uploadUrlResponse);

  if (!uploadUrl || !mediaId) {
    throw new Error("Upload URL response is incomplete.");
  }

  await uploadFileToSignedUrl({
    uploadUrl,
    file,
    signal,
  });

  const confirmedResponse = await confirmMediaUpload(mediaId);
  const confirmedMedia = normalizeConfirmedMedia(confirmedResponse);

  return {
    mediaId: confirmedMedia?.id || mediaId,
    media: confirmedMedia,
    upload: uploadUrlResponse,
    confirm: confirmedResponse,
  };
};
