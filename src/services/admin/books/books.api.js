import api from "@/lib/admin-axios";
import axios from "axios";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ACCESS_TOKEN_KEY = "spcs_admin_token_key_prod";

export const getBooks = async ({
  filter = "all",
  search = "",
  fromDate = "",
  toDate = "",
  page = 1,
  limit = 10,
} = {}) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filter === "best_seller" || filter === "bestsellers") {
      params.set("isBestsellerManual", "true");
    }

    if (filter === "new_arrival" || filter === "recent") {
      params.set("isNewArrival", "true");
    }

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (fromDate.trim()) {
      params.set("createdFrom", `${fromDate.trim()}T00:00:00.000`);
    }

    if (toDate.trim()) {
      params.set("createdTo", `${toDate.trim()}T23:59:59.999`);
    }

    const res = await api.get(`/admin/books?${params.toString()}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch books" };
  }
};

export const createBook = async (payload) => {
  try {
    const res = await api.post("/admin/books", payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to create book" };
  }
};

export const getBookById = async (bookId) => {
  try {
    const res = await api.get(`/admin/books/${bookId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch book" };
  }
};

export const updateBook = async (bookId, payload) => {
  try {
    const res = await api.put(`/admin/books/${bookId}`, payload, {
      headers:
        payload instanceof FormData
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    });
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to update book" };
  }
};

export const deleteBook = async (bookId) => {
  try {
    const res = await api.delete(`/admin/books/${bookId}`);
    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to delete book" };
  }
};

export const exportBooksCsv = async ({
  search = "",
  from_date = "",
  to_date = "",
  filter = "",
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (from_date.trim()) {
      params.set("from_date", from_date.trim());
    }

    if (to_date.trim()) {
      params.set("to_date", to_date.trim());
    }

    if (filter && filter !== "all") {
      params.set("filter", filter);
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem(ACCESS_TOKEN_KEY)
        : null;

    const response = await axios.get(
      `${API_ORIGIN}/api/admin/books/export/csv?${params.toString()}`,
      {
        responseType: "blob",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      }
    );

    const disposition = response.headers["content-disposition"] || "";
    const filenameMatch = disposition.match(/filename="?([^"]+)"?/i);

    return {
      blob: response.data,
      filename: filenameMatch?.[1] || "books.csv",
    };
  } catch (error) {
    throw (
      error?.response?.data ||
      error?.data ||
      error || {
        message: "Failed to export books CSV",
      }
    );
  }
};
