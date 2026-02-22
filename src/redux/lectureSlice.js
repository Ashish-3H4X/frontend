import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
  name: "lecture",

  initialState: {
    lectureData: [], // All lectures of a course
  },

  reducers: {

    // Set / Replace all lectures
    setLectureData: (state, action) => {
      state.lectureData = action.payload;
    },

    // Add new lecture
    addLecture: (state, action) => {
      state.lectureData.push(action.payload);
    },

    // Update existing lecture
    updateLecture: (state, action) => {

      const index = state.lectureData.findIndex(
        (lec) => lec._id === action.payload._id
      );

      if (index !== -1) {
        state.lectureData[index] = action.payload;
      }
    },

    // Delete lecture
    deleteLecture: (state, action) => {
      state.lectureData = state.lectureData.filter(
        (lec) => lec._id !== action.payload
      );
    },

    // Clear when logout / change course
    clearLectures: (state) => {
      state.lectureData = [];
    },

  },
});


export const {
  setLectureData,
  addLecture,
  updateLecture,
  deleteLecture,
  clearLectures,
} = lectureSlice.actions;

export default lectureSlice.reducer;
