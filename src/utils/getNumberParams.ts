interface Params {
  params: string | string[] | undefined;
}
export const getNumberParams = (params: Params): Number => {
  if (typeof params === "string") {
    return Number(params);
  } else if (Array.isArray(params)) {
    return Number(params[0]) || 0;
  } else {
    return 0;
  }
};
