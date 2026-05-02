import axios from "axios";
import api from "@/lib/admin-axios";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ACCESS_TOKEN_KEY = "spcs_admin_token_key_prod";

export const getCustomers = async ({
  search = "",
  from_date = "",
  to_date = "",
  page = 1,
  limit = 10,
} = {}) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (search) {
      params.set("search", search);
    }

    if (from_date) {
      params.set("from_date", from_date);
    }

    if (to_date) {
      params.set("to_date", to_date);
    }

    const res = await api.get(`/admin/customers?${params.toString()}`);

    return res;
  } catch (error) {
    throw error?.data || error || { message: "Failed to fetch customers" };
  }
};

export const exportCustomersCsv = async ({
  search = "",
  from_date = "",
  to_date = "",
} = {}) => {
  try {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (from_date) {
      params.set("from_date", from_date);
    }

    if (to_date) {
      params.set("to_date", to_date);
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem(ACCESS_TOKEN_KEY)
        : null;

    const response = await axios.get(
      `${API_ORIGIN}/api/admin/customers/export/csv?${params.toString()}`,
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
      filename: filenameMatch?.[1] || "customers.csv",
    };
  } catch (error) {
    throw (
      error?.response?.data ||
      error?.data ||
      error || {
        message: "Failed to export customers CSV",
      }
    );
  }
};
