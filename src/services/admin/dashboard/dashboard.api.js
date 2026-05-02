import api from "@/lib/admin-axios";

export const getAdminDashboard = async () => {
  return api.get("/admin/dashboard");
};