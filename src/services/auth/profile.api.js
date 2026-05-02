import { getCurrentUser } from "@/services/auth/auth.api";

export const getAdminProfile = async () => {
  return getCurrentUser();
};
