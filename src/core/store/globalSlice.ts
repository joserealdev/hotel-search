import { Hotel } from "@/types/hotel";
import hotelsApi from "@core/api/hotelsApi";
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

interface State {
  searchText: string;
  hotels: Hotel[];
  latestFetchState: LoadingState;
  errors: SerializedError[];
}

const initialState: State = {
  searchText: "",
  hotels: [],
  latestFetchState: "idle",
  errors: [],
};

const fetchLatests = createAsyncThunk("hotels/hotels", async () => {
  return hotelsApi.fetchHotels();
});

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatests.pending, (state, action) => {
      state.latestFetchState = "loading";
    });
    builder.addCase(fetchLatests.fulfilled, (state, action) => {
      state.hotels = action.payload;
      state.latestFetchState = "succeeded";
    });
    builder.addCase(fetchLatests.rejected, (state, action) => {
      state.errors.push(action.error);
      state.latestFetchState = "failed";
    });
  },
});

export { fetchLatests };
export default globalSlice.reducer;
