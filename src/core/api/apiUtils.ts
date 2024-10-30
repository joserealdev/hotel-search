const baseUrl = process.env.API_URL;

const baseFetch = async (
  path: string,
  init?: RequestInit,
  queryParams: Record<string, string | string[]> = {}
): Promise<any> => {
  const response = await fetch(
    `${baseUrl}${path}${constructQueryParams(queryParams)}`,
    init
  );
  return response.ok
    ? response.json()
    : Promise.reject(
        `Request failed with status: ${response.status} ${response.statusText}`
      );
};

const constructQueryParams = (
  queryParams: Record<string, string | string[]>
): string => {
  const hasParams = Object.values(queryParams).some(
    (value) => typeof value === "string" || (value as string[]).length > 0
  );
  if (!hasParams) {
    return "";
  }

  const params = Object.entries(queryParams);
  return params.reduce(
    (previousValue: string, currentValue: (string | string[])[]) => {
      const key = currentValue[0] as string;
      const value = currentValue[1];

      const param =
        typeof value === "string" ? value : (value as string[]).join(",");
      const prefix = previousValue === "?" ? "" : "&";

      return `${previousValue}${prefix}${key}=${param}`;
    },
    "?"
  );
};

export { baseFetch };
