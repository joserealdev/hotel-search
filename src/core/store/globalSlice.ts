import { Filter } from "@/types/filters";
import { Hotel } from "@/types/hotel";
import { apiFetchHotels } from "@core/api/hotelsApi";
import { getFilters } from "@core/helpers/hotel";
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

interface State {
  searchText: string;
  hotels: Hotel[];
  featureFilters: Filter[];
  ratingFilter: Filter[];
  latestFetchState: LoadingState;
  errors: SerializedError[];
}

const initialState: State = {
  searchText: "",
  hotels: [],
  featureFilters: [],
  ratingFilter: [5, 4, 3, 2, 1].map((stars) => ({
    feature: stars.toString(),
    isSelected: false,
  })),
  latestFetchState: "idle",
  errors: [],
};

const fetchHotels = createAsyncThunk(
  "hotels/hotels",
  async () => {
    return apiFetchHotels();
  },
  {
    condition: (_, { getState }) =>
      (getState() as RootState).global.latestFetchState !== "loading",
  }
);

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeFeatureFilter: (state: State, action: PayloadAction<string>) => {
      const idx = state.featureFilters.findIndex(
        ({ feature }) => feature === action.payload
      );
      if (idx < 0) return state;
      state.featureFilters[idx] = {
        ...state.featureFilters[idx],
        isSelected: !state.featureFilters[idx].isSelected,
      };
    },
    changeRatingFilter: (state: State, action: PayloadAction<number>) => {
      const idx = state.ratingFilter.findIndex(
        ({ feature }) => feature === action.payload.toString()
      );
      if (idx < 0) return state;
      state.ratingFilter[idx] = {
        ...state.ratingFilter[idx],
        isSelected: !state.ratingFilter[idx].isSelected,
      };
    },
    resetFilters: (state: State) => {
      state.featureFilters = state.featureFilters.map((filter) => ({
        ...filter,
        isSelected: false,
      }));
      state.ratingFilter = state.ratingFilter.map((filter) => ({
        ...filter,
        isSelected: false,
      }));
    },
    setHotels: (state: State, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
      state.featureFilters = getFilters(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotels.pending, (state, action) => {
      state.latestFetchState = "loading";
    });
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.latestFetchState = "succeeded";
      state.hotels = action.payload;
      state.featureFilters = getFilters(action.payload);
    });
    builder.addCase(fetchHotels.rejected, (state, action) => {
      state.errors.push(action.error);
      state.latestFetchState = "failed";
    });
  },
});

export const {
  changeFeatureFilter,
  changeRatingFilter,
  resetFilters,
  setHotels,
} = globalSlice.actions;
export { fetchHotels };
export default globalSlice.reducer;
