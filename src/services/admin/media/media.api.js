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

const getUploadFieldsFromResponse = (response) =>
  response?.data?.fields ||
  response?.fields ||
  null;

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

export const generateUploadUrl = generateMediaUploadUrl;

export const confirmMediaUpload = async (mediaId) => {
  try {
    const res = await api.post("/admin/media/confirm", { mediaId });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to confirm upload" };
  }
};

export const uploadFileToSignedUrl = async ({
  uploadUrl,
  uploadFields,
  file,
  signal,
}) => {
  const hasUploadFields =
    uploadFields &&
    typeof uploadFields === "object" &&
    Object.keys(uploadFields).length > 0;

  const response = hasUploadFields
    ? await (() => {
        const formData = new FormData();

        Object.entries(uploadFields).forEach(([key, value]) => {
          formData.append(key, value);
        });

        formData.append("file", file);

        return fetch(uploadUrl, {
          method: "POST",
          body: formData,
          signal,
        });
      })()
    : await fetch(uploadUrl, {
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

export const uploadToS3 = async (uploadUrl, uploadFields, file, signal) =>
  uploadFileToSignedUrl({
    uploadUrl,
    uploadFields,
    file,
    signal,
  });

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
  const uploadFields = getUploadFieldsFromResponse(uploadUrlResponse);
  const mediaId = getMediaIdFromResponse(uploadUrlResponse);

  if (!uploadUrl || !mediaId) {
    throw new Error("Upload URL response is incomplete.");
  }

  await uploadToS3(uploadUrl, uploadFields, file, signal);

  const confirmedResponse = await confirmMediaUpload(mediaId);
  const confirmedMedia = normalizeConfirmedMedia(confirmedResponse);

  return {
    mediaId: confirmedMedia?.id || mediaId,
    media: confirmedMedia,
    upload: uploadUrlResponse,
    confirm: confirmedResponse,
  };
};
