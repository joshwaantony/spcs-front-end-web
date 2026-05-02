import { getCurrentUser } from "@/services/admin/auth.api";

export const getAdminProfile = async () => {
  return getCurrentUser();
};
