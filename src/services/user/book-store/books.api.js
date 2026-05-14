import { apiRaw } from "@/lib/admin-axios";

const buildBooksQueryString = ({
  page = 1,
  limit = 20,
  search = "",
  categoryId = "",
  formatType = "",
  minPrice,
  maxPrice,
  languageCode = "",
  hasDiscount,
  inStock,
  isDigital,
  physicalOnly,
  isFeatured,
  isNewArrival,
  isBestsellerManual,
  isAwardWinner,
  isPrePublication,
  sort = "newest",
} = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: sort === "rank" ? "rank" : "newest",
  });

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  if (categoryId?.trim()) {
    params.set("categoryId", categoryId.trim());
  }

  if (formatType?.trim()) {
    params.set("formatType", formatType.trim());
  }

  if (typeof minPrice === "number" && Number.isFinite(minPrice)) {
    params.set("minPrice", String(minPrice));
  }

  if (typeof maxPrice === "number" && Number.isFinite(maxPrice)) {
    params.set("maxPrice", String(maxPrice));
  }

  if (languageCode?.trim()) {
    params.set("languageCode", languageCode.trim());
  }

  if (physicalOnly) {
    params.set("isDigital", "false");
  }

  const flags = {
    hasDiscount,
    inStock,
    isDigital,
    isFeatured,
    isNewArrival,
    isBestsellerManual,
    isAwardWinner,
    isPrePublication,
  };

  Object.entries(flags).forEach(([key, value]) => {
    if (value === true) {
      params.set(key, "true");
    }
  });

  return params.toString();
};

const getMediaUrl = (media) =>
  media?.url || media?.secureUrl || media?.fileUrl || media?.path || media?.src || "";

const normalizeFormat = (format) => {
  if (!format) {
    return null;
  }

  return {
    ...format,
    id: format.id || "",
    type: format.type || "PAPERBACK",
    price: Number(format.price ?? 0),
    discountAmount: Number(format.discountAmount ?? 0),
    isbn: format.isbn || "",
    stockCount: Number(format.stockCount ?? 0),
    hasUnlimitedStock: Boolean(format.hasUnlimitedStock),
    isDigitalEnabled: Boolean(format.isDigitalEnabled),
    drmEnabled: Boolean(format.drmEnabled),
    isActive: format.isActive !== false,
    media: format.media
      ? {
          ...format.media,
          url: getMediaUrl(format.media),
        }
      : null,
  };
};

const getPrimaryFormat = (formats = []) => {
  if (!Array.isArray(formats) || formats.length === 0) {
    return null;
  }

  return (
    formats.find((format) => format?.type === "PAPERBACK") ||
    formats.find((format) => format?.type === "HARDCOVER") ||
    formats[0]
  );
};

const normalizeBook = (book) => {
  if (!book) {
    return null;
  }

  const formats = Array.isArray(book.formats)
    ? book.formats.map(normalizeFormat).filter(Boolean)
    : [];
  const primaryFormat = getPrimaryFormat(formats);
  const coverImage =
    book.cover_image_url ||
    book.image ||
    getMediaUrl(book.coverMedia) ||
    getMediaUrl(primaryFormat?.media);
  const price =
    primaryFormat?.price ??
    book.price ??
    0;
  const discountAmount =
    primaryFormat?.discountAmount ??
    book.discountAmount ??
    0;
  const stockCount =
    primaryFormat?.stockCount ??
    book.stockCount ??
    book.stock ??
    0;
  const categories = Array.isArray(book.categories)
    ? book.categories
        .map((item) => item?.category || item)
        .filter(Boolean)
    : [];
  const formatType = primaryFormat?.type || book.type || "PAPERBACK";
  const isDigitalBook =
    typeof primaryFormat?.isDigitalEnabled === "boolean"
      ? primaryFormat.isDigitalEnabled
      : formatType === "EBOOK" || formatType === "AUDIO";

  return {
    ...book,
    id: book.id || book.book_id || "",
    title: book.title || book.name || "Untitled Book",
    slug: book.slug || "",
    authorName: book.authorName || book.author || "Unknown Author",
    titleMl: book.titleMl || book.malayalam_name || "",
    authorNameMl: book.authorNameMl || "",
    description: book.description || "",
    edition: book.edition || "",
    pages: Number(book.pages ?? 0),
    status: book.status || "",
    createdAt: book.createdAt || "",
    updatedAt: book.updatedAt || "",
    publisher: book.publisher
      ? {
          ...book.publisher,
          id: book.publisher.id || "",
          name: book.publisher.name || "SPCS",
          slug: book.publisher.slug || "",
        }
      : null,
    coverMedia: book.coverMedia
      ? {
          ...book.coverMedia,
          id: book.coverMedia.id || "",
          url: getMediaUrl(book.coverMedia),
          altText: book.coverMedia.altText || book.title || "",
          mimeType: book.coverMedia.mimeType || "",
        }
      : null,
    image: coverImage || "/images/book-placeholder.png",
    price,
    discountAmount,
    priceLabel: `Rs ${price || 0}`,
    formatType,
    categories,
    categoryNames: categories.map((category) => category?.name).filter(Boolean),
    formats,
    inStock: Number(stockCount) > 0 || Boolean(primaryFormat?.hasUnlimitedStock),
    isDigital: isDigitalBook,
    isFeatured: Boolean(book.isFeatured ?? book.highlight),
    isNewArrival: Boolean(book.isNewArrival ?? book.new_arrival),
    isBestsellerManual: Boolean(book.isBestsellerManual ?? book.best_seller),
    isAwardWinner: Boolean(book.isAwardWinner ?? book.award_winner),
    isPrePublication: Boolean(book.isPrePublication ?? book.republication),
    languageCode: book.languageCode || book.language || "",
    hasAudio: Boolean(book.hasAudio),
    hasEbook: Boolean(book.hasEbook),
    startingPrice: Number(book.startingPrice ?? price ?? 0),
    maxPrice: Number(book.maxPrice ?? price ?? 0),
    hasDiscount: Boolean(
      book.hasDiscount ?? (Number(discountAmount) > 0)
    ),
    availableFormats: Number(book.availableFormats ?? formats.length ?? 0),
  };
};

const normalizeCategory = (category) => {
  if (!category) {
    return null;
  }

  return {
    ...category,
    id: category.id || category.category_id || "",
    name: category.name || "Untitled Category",
    slug: category.slug || "",
  };
};

const parseBooksPayload = (payload, fallbackPage, fallbackLimit) => {
  const source = payload?.data || payload || {};
  const books = (
    Array.isArray(source)
      ? source
      : Array.isArray(source.items)
        ? source.items
        : Array.isArray(source.books)
          ? source.books
          : Array.isArray(source.data)
            ? source.data
            : []
  )
    .map(normalizeBook)
    .filter(Boolean);

  const meta = source.meta || {};
  const total = meta.total || source.total || books.length;
  const limit = meta.limit || source.limit || fallbackLimit;
  const page = meta.page || source.page || fallbackPage;
  const totalPages =
    meta.totalPages ||
    source.totalPages ||
    (total > 0 ? Math.ceil(total / limit) : 1);

  return {
    books,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

const parseCategoriesPayload = (payload) => {
  const source = payload?.data || payload || {};

  return (
    Array.isArray(source)
      ? source
      : Array.isArray(source.items)
        ? source.items
        : Array.isArray(source.categories)
          ? source.categories
          : Array.isArray(source.data)
            ? source.data
            : []
  )
    .map(normalizeCategory)
    .filter(Boolean);
};

const parseBookPayload = (payload) => {
  const source = payload?.data || payload || {};
  const rawBook = source.data || source.book || source.item || source;

  return normalizeBook(rawBook);
};

export async function getPublicBooks(params = {}) {
  const queryString = buildBooksQueryString(params);
  const response = await apiRaw.get(`/books?${queryString}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const payload = response.data;
  return parseBooksPayload(payload, params.page || 1, params.limit || 20);
}

export async function getPublicCategories() {
  try {
    const response = await apiRaw.get("/categories?page=1&limit=100", {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    const payload = response.data;
    return parseCategoriesPayload(payload);
  } catch {
    return [];
  }
}

export async function getPublicBookBySlug(slug) {
  const response = await apiRaw.get(`/books/${encodeURIComponent(slug)}`, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  const payload = response.data;
  return parseBookPayload(payload);
}
