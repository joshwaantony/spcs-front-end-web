const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const API_BASE_URL = `${API_ORIGIN}/api/v1`;

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

  const primaryFormat = getPrimaryFormat(book.formats);
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
    authorName: book.authorName || book.author || "Unknown Author",
    titleMl: book.titleMl || book.malayalam_name || "",
    description: book.description || "",
    image: coverImage || "/images/book-placeholder.png",
    price,
    discountAmount,
    priceLabel: `Rs ${price || 0}`,
    formatType,
    categories,
    categoryNames: categories.map((category) => category?.name).filter(Boolean),
    inStock: Number(stockCount) > 0 || Boolean(primaryFormat?.hasUnlimitedStock),
    isDigital: isDigitalBook,
    isFeatured: Boolean(book.isFeatured ?? book.highlight),
    isNewArrival: Boolean(book.isNewArrival ?? book.new_arrival),
    isBestsellerManual: Boolean(book.isBestsellerManual ?? book.best_seller),
    isAwardWinner: Boolean(book.isAwardWinner ?? book.award_winner),
    isPrePublication: Boolean(book.isPrePublication ?? book.republication),
    languageCode: book.languageCode || book.language || "",
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

export async function getPublicBooks(params = {}) {
  const queryString = buildBooksQueryString(params);
  const response = await fetch(`${API_BASE_URL}/books?${queryString}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const payload = await response.json();
  return parseBooksPayload(payload, params.page || 1, params.limit || 20);
}

export async function getPublicCategories() {
  const response = await fetch(`${API_BASE_URL}/categories?page=1&limit=100`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const payload = await response.json();
  return parseCategoriesPayload(payload);
}
