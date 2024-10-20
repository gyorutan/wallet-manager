import useSWR from "swr";
import { User } from "@/types/authType";
import { USERS_API } from "@/constants/api";
import { fetcher } from "@/lib/fetcher";

export const useCurrentUser = (user: User | null) => {
  const { data, isLoading } = useSWR(
    user ? `${USERS_API}/${user.id}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
  };
};
