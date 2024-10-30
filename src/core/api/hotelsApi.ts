"use server";

import { Hotel } from "@/types/hotel";
import { baseFetch } from "./apiUtils";
import { HOTELS } from "./data";

export const apiFetchHotels = async (): Promise<Hotel[]> => {
  return new Promise((res) => res(HOTELS));
  // Replace with actual API call
  return baseFetch("/hotels", { cache: "force-cache" });
};
