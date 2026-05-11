import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* ================================
   Async Thunks
================================ */

// Fetch All Requests
export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/request");
      return response.data.data; // your sample JSON structure
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchRequestById = createAsyncThunk(
  "requests/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/request/${id}`);
      return {
        ...response.data.request,
        items: response.data.items
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Request
export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async (newRequest, { rejectWithValue }) => {
    try {
      const response = await API.post("/request", newRequest);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ================================
   Slice
================================ */

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    selectedRequest: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    clearSelectedRequest: (state) => {
      state.selectedRequest = null;
    },
    updateRequestStatus: (state, action) => {
      const { id, status } = action.payload;
      const request = state.requests.find((req) => req._id === id);
      if (request) {
        request.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch Requests */
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch";
        state.requests = [];
      })

      /* Fetch Request By ID */
      .addCase(fetchRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRequest = action.payload || null;
      })
      .addCase(fetchRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch request";
      })

      /* Create Request */
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 Ensure array safety
        if (!Array.isArray(state.requests)) {
          state.requests = [];
        }

        state.requests.unshift(action.payload); // better UX (new on top)
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Create failed";
      });
  },
});

export const {
  setSelectedRequest,
  clearSelectedRequest,
  updateRequestStatus,
} = requestSlice.actions;

export default requestSlice.reducer;