import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url =
  'https://app.scrapeak.com/v1/scrapers/zillow/locationSuggestions';

export const findHome = createAsyncThunk(
  'homes/find',

  async (queryValue, thunkApi) => {
    try {
      const apiKey = '615e64d1-ae7e-4fb1-afd6-6156e7983b73';

      const { data } = await axios.get(
        `${api_url}?api_key=${apiKey}&q=${queryValue}`
      );
      console.log('Server Response:', data);

      console.log('data.data.results: ', data.data.results);
      return data.data.results;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  findTerm: [],
  isLoading: false,
  error: null,
};

const findSlice = createSlice({
  name: ' find',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(findHome.fulfilled, (state, { payload }) => {
        state.findTerm = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(findHome.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(findHome.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});
export const { setFindTerm } = findSlice.actions;
export const findReducer = findSlice.reducer;
