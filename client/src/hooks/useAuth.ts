import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { login } from "@/api/auth";

export const useAuth = () => {
  return useQuery({
    queryKey: queryKeys.login,
    queryFn: login,
  });
};
