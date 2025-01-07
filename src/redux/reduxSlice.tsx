import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}
const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null
}
export const fetchData = createAsyncThunk("dataslice/fetchData", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabit: Habit[] = [
    {
      id: "1",
      name: "Read",
      frequency: "weekly",
      completedDates: [],
      createdAt: new Date().toISOString().split("T")[0]
    },
    {
      id: "2",
      name: "Rated",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString().split("T")[0]
    }
  ];
  return mockHabit;
})
const reduxData = createSlice({
  name: 'dataslice',
  initialState,
  reducers: {
    addNew: (state, actions: PayloadAction<{ name: string, frequency: "daily" | "weekly" }>) => {
      const addHabbit: Habit = {
        id: Date.now().toString(),
        name: actions.payload.name,
        frequency: actions.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString()
      }
      state.habits.push(addHabbit)
    },
    habbitsToggle: (state, actions: PayloadAction<{ id: string, date: string }>) => {
      const item = state.habits.find((val) => val.id === actions.payload.id);
      if (item) {
        const index = item.completedDates.indexOf(actions.payload.date)
        if (index >= 0) {
          item.completedDates.splice(index, 1)
        }
        else {
          item.completedDates.push(actions.payload.date)
        }
      }
    },
    deletItem: (state, actions: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter((val) => {
        return val.id !== actions.payload.id
      })
    }
  },
  extraReducers:(builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchData.fulfilled, (state,actions) => {
      state.isLoading = false;
      state.habits = actions.payload
    })
    .addCase(fetchData.rejected, (state,actions) => {
      state.isLoading = false;
      state.error = actions.error.message || "Failed to Fetch the Habits"
    });
  }
})

export default reduxData.reducer;
export const { habbitsToggle, addNew, deletItem } = reduxData.actions
