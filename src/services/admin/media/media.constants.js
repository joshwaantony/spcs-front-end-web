export const ASSET_TYPES = {
  BOOK_COVER: "BOOK_COVER",
  EBOOK_FILE: "EBOOK_FILE",
  AUDIO_BOOK_FILE: "AUDIO_BOOK_FILE",
  BULLETIN_COVER: "BULLETIN_COVER",
  BULLETIN_FILE: "BULLETIN_FILE",
  RESOURCE_FILE: "RESOURCE_FILE",
  RESOURCE_COVER: "RESOURCE_COVER",
  PROMOTION_IMAGE: "PROMOTION_IMAGE",
  AWARD_IMAGE: "AWARD_IMAGE",
  POST_FEATURED_IMAGE: "POST_FEATURED_IMAGE",
  GALLERY_ITEM: "GALLERY_ITEM",
};

const mb = 1024 * 1024;

export const assetPolicyMap = {
  [ASSET_TYPES.BOOK_COVER]: {
    visibility: "PUBLIC",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxSize: 5 * mb,
  },
  [ASSET_TYPES.EBOOK_FILE]: {
    visibility: "PRIVATE",
    allowedMimeTypes: ["application/pdf", "application/epub+zip"],
    maxSize: 200 * mb,
  },
  [ASSET_TYPES.AUDIO_BOOK_FILE]: {
    visibility: "PRIVATE",
    allowedMimeTypes: ["audio/mpeg", "audio/mp4", "audio/x-m4a", "audio/wav"],
    maxSize: 500 * mb,
  },
  [ASSET_TYPES.BULLETIN_COVER]: {
    visibility: "PUBLIC",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxSize: 5 * mb,
  },
  [ASSET_TYPES.BULLETIN_FILE]: {
    visibility: "PRIVATE",
    allowedMimeTypes: ["application/pdf"],
    maxSize: 50 * mb,
  },
  [ASSET_TYPES.RESOURCE_FILE]: {
    visibility: "PRIVATE",
    allowedMimeTypes: ["application/pdf", "application/msword", "application/zip"],
    maxSize: 100 * mb,
  },
  [ASSET_TYPES.RESOURCE_COVER]: {
    visibility: "PUBLIC",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxSize: 5 * mb,
  },
  [ASSET_TYPES.PROMOTION_IMAGE]: {
    visibility: "PUBLIC",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    maxSize: 5 * mb,
  },
  [ASSET_TYPES.AWARD_IMAGE]: {
    visibility: "PUBLIC",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxSize: 5 * mb,
  },
  [ASSET_TYPES.POST_FEATURED_IMAGE]: {
    visibility: "PUBLIC",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxSize: 5 * mb,
  },
  [ASSET_TYPES.GALLERY_ITEM]: {
    visibility: "PUBLIC",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
    maxSize: 10 * mb,
  },
};

export const formatFileSize = (bytes) => {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 MB";
  }

  if (bytes < mb) {
    return `${Math.max(bytes / 1024, 1).toFixed(0)} KB`;
  }

  return `${(bytes / mb).toFixed(bytes >= 10 * mb ? 0 : 1)} MB`;
};

export const validateAssetFile = ({ file, assetType }) => {
  const policy = assetPolicyMap[assetType];

  if (!policy) {
    throw new Error("Unsupported asset type.");
  }

  if (!file) {
    throw new Error("Please select a file to upload.");
  }

  if (!policy.allowedMimeTypes.includes(file.type)) {
    throw new Error(
      `Unsupported file type. Allowed: ${policy.allowedMimeTypes.join(", ")}`
    );
  }

  if (file.size > policy.maxSize) {
    throw new Error(
      `File is too large. Maximum allowed size is ${formatFileSize(
        policy.maxSize
      )}.`
    );
  }

  return policy;
};
