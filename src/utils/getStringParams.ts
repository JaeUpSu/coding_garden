interface Params {
  params: string | string[] | undefined;
}
export const getStringParams = ({ params }: Params): string => {
  if (typeof params === "string") {
    return params;
  } else if (Array.isArray(params)) {
    return params[0] || "";
  } else {
    return "";
  }
};
