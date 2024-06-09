import { Hotel } from "@/types/hotel";
import { baseFetch } from "./apiUtils";

const fetchHotels = async (): Promise<Hotel[]> => {
  return baseFetch("/hotels");
};

const hotelsApi = {
  fetchHotels,
};

export default hotelsApi;
