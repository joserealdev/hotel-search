import { Filter } from "@/types/filters";
import { Hotel } from "@/types/hotel";

const getFilters = (hotels: Hotel[]) => {
  return hotels.reduce((prev, curr) => {
    curr.features.forEach((feature) => {
      if (!prev.find((feat) => feat.feature === feature)) {
        prev.push({ feature, isSelected: false });
      }
    });

    return prev;
  }, [] as Filter[]);
};

export { getFilters };
