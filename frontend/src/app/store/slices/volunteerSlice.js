import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/volunteer';

export const fetchVolunteerStats = createAsyncThunk(
  'volunteer/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAvailableTasks = createAsyncThunk(
  'volunteer/fetchAvailableTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVolunteerHistory = createAsyncThunk(
  'volunteer/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptTask = createAsyncThunk(
  'volunteer/acceptTask',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/accept`, { requestId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState: {
    stats: null,
    availableTasks: [],
    history: [],
    loading: false,
    error: null,
    volunteer: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Stats
      .addCase(fetchVolunteerStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVolunteerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.volunteer = action.payload.volunteer;
      })
      .addCase(fetchVolunteerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch stats';
      })
      // Fetch Available Tasks
      .addCase(fetchAvailableTasks.fulfilled, (state, action) => {
        state.availableTasks = action.payload.tasks;
      })
      // Fetch History
      .addCase(fetchVolunteerHistory.fulfilled, (state, action) => {
        state.history = action.payload.history;
      })
      // Accept Task
      .addCase(acceptTask.fulfilled, (state, action) => {
        // Optionally update local state
        state.stats.activeTasks += 1;
      });
  }
});

export default volunteerSlice.reducer;
