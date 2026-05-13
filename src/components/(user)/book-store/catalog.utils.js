export const FLAG_FILTERS = [
  { key: "isFeatured", label: "Staff picks" },
  { key: "isNewArrival", label: "Just arrived" },
  { key: "isBestsellerManual", label: "Popular right now" },
  { key: "isAwardWinner", label: "Award-winning reads" },
  { key: "isPrePublication", label: "Available for pre-order" },
];

export const FORMAT_FILTERS = [
  { key: "PAPERBACK", label: "Paperback edition" },
  { key: "HARDCOVER", label: "Hardcover edition" },
  { key: "EBOOK", label: "E-book edition" },
  { key: "AUDIO", label: "Audiobook edition" },
];

export const buildCatalogHref = (basePath, currentQuery, updates = {}) => {
  const params = new URLSearchParams();
  const nextQuery = {
    ...currentQuery,
    ...updates,
  };

  Object.entries(nextQuery).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "" || value === false) {
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

export const isFilterActive = (value) => value === true || value === "true";
