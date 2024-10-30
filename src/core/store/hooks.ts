import { createSelector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const hotelFilter = () =>
  createSelector(
    [
      (state: RootState) => state.global.hotels,
      (state: RootState) => state.global.featureFilters,
      (state: RootState) => state.global.ratingFilter,
    ],
    (hotels, featureFilters, ratingFilter) => {
      // Filter hotels based on feature filters
      const filteredByFeatures = hotels.filter((hotel) => {
        return featureFilters.every((filter) =>
          filter.isSelected ? hotel.features.includes(filter.feature) : true
        );
      });

      // Filter hotels based on rating filter
      const filteredByRating = ratingFilter.some((filter) => filter.isSelected)
        ? filteredByFeatures.filter((hotel) => {
            return ratingFilter.some((filter) =>
              filter.isSelected
                ? hotel.star === parseInt(filter.feature)
                : false
            );
          })
        : filteredByFeatures;

      return filteredByRating;
    }
  );
