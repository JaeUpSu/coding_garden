import Cookies from "js-cookie";

export function getAccessToken() {
  const access = Cookies.get("access");
  return access || undefined;
}
// console.log(getAccessToken());
export function getRefreshToken() {
  const refresh = Cookies.get("refresh");
  if (!refresh) return undefined;
  return refresh;
}
export const removeAccessToken = () => {
  Cookies.remove("refresh");
  Cookies.remove("access");
};
