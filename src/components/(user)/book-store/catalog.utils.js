export const FLAG_FILTERS = [
  { key: "isFeatured", label: "Featured Picks" },
  { key: "isNewArrival", label: "New Arrivals" },
  { key: "isBestsellerManual", label: "Best Sellers" },
  { key: "isAwardWinner", label: "Award Winners" },
  { key: "isPrePublication", label: "Pre Publication" },
];

export const FORMAT_FILTERS = [
  { key: "PAPERBACK", label: "Paperback" },
  { key: "HARDCOVER", label: "Hardcover" },
  { key: "EBOOK", label: "E-Book" },
  { key: "AUDIO", label: "Audiobook" },
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
