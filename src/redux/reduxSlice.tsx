import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  // isLoading: boolean;
  // error: string | null;
}
const initialState: HabitState = {
  habits: [],
  // isLoading: false,
  // error: null
}
// export const fetchData = async()
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
        else{
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
})

export default reduxData.reducer;
export const { habbitsToggle, addNew, deletItem } = reduxData.actions
