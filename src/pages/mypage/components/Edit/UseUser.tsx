import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/services/api";
import { UserData } from "@/typings/LectureData";
export default function useUser() {
  const { isLoading, data, isError } = useQuery<UserData>(
    ["myprofile"],
    getMyProfile,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  /*재시도를 막음*/
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
