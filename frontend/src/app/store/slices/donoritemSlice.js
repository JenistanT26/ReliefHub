import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* ===========================
   DONOR ITEM THUNKS
=========================== */

export const createDonorItem = createAsyncThunk(
  "donor/createItem",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/donor-item", data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchAllDonorItems = createAsyncThunk(
  "donor/fetchAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/donor-item");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchDonorItemsByDonorId = createAsyncThunk(
  "donor/fetchItemsByDonor",
  async (donorId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/donor-item/donor/${donorId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchDonorItemById = createAsyncThunk(
  "donor/fetchItemById",
  async (itemId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/donor-item/item/${itemId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


/* ===========================
   DONATION INTENT THUNKS
=========================== */

export const submitDonationIntent = createAsyncThunk(
  "donor/submitDonationIntent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/donation-intent", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchDonationIntents = createAsyncThunk(
  "donor/fetchAllIntents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/donation-intent");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchDonationIntentsByRequestId = createAsyncThunk(
  "donor/fetchByRequestItem",
  async (requestItemId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/request/${requestId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchDonationIntentsByRequestItemId = createAsyncThunk(
  "donor/fetchByRequestItem",
  async (requestItemId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/request-item/${requestItemId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchDonationIntentsByDonorId = createAsyncThunk(
  "donor/fetchByDonor",
  async (donorId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/donor/${donorId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const updateDonationIntentStatus = createAsyncThunk(
  "donor/updateIntentStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/donation-intent/${id}`, { status });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


/* ===========================
   SLICE
=========================== */

const donorSlice = createSlice({
  name: "donor",

  initialState: {
    donorItems: [],
    selectedDonorItem: null,

    donationIntents: [],

    loading: false,
    error: null
  },

  reducers: {
    clearDonorState: (state) => {
      state.donorItems = [];
      state.donationIntents = [];
      state.selectedDonorItem = null;
      state.loading = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      /* CREATE DONOR ITEM */
      .addCase(createDonorItem.fulfilled, (state, action) => {
        state.donorItems.push(action.payload);
      })

      /* FETCH ALL DONOR ITEMS */
      .addCase(fetchAllDonorItems.fulfilled, (state, action) => {
        state.donorItems = action.payload;
      })

      /* FETCH DONOR ITEMS BY DONOR */
      .addCase(fetchDonorItemsByDonorId.fulfilled, (state, action) => {
        state.donorItems = action.payload;
      })

      /* FETCH SINGLE DONOR ITEM */
      .addCase(fetchDonorItemById.fulfilled, (state, action) => {
        state.selectedDonorItem = action.payload;
      })


      /* SUBMIT DONATION */
      .addCase(submitDonationIntent.fulfilled, (state, action) => {
        state.donorItems.push(...action.payload.donorItems);
        state.donationIntents.push(...action.payload.intents);
      })


      /* FETCH INTENTS */
      .addCase(fetchDonationIntents.fulfilled, (state, action) => {
        state.donationIntents = action.payload;
      })

      .addCase(fetchDonationIntentsByRequestItemId.fulfilled, (state, action) => {
        state.donationIntents = action.payload;
      })

      .addCase(fetchDonationIntentsByDonorId.fulfilled, (state, action) => {
        state.donationIntents = action.payload;
      })


      /* UPDATE STATUS */
      .addCase(updateDonationIntentStatus.fulfilled, (state, action) => {
        const index = state.donationIntents.findIndex(
          (intent) => intent._id === action.payload._id
        );

        if (index !== -1) {
          state.donationIntents[index] = action.payload;
        }
      });
  }
});

export const { clearDonorState } = donorSlice.actions;

export default donorSlice.reducer;