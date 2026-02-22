import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",

  initialState: {
    courseData: [],
    creatorCourseData: null,
    selectedCourseData: null, // 👈 ADD
  },

  reducers: {

    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },

    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },

    setSelectedCourseData: (state, action) => {   // 👈 ADD
      state.selectedCourseData = action.payload;
    },

    clearSelectedCourse: (state) => {              // 👈 OPTIONAL
      state.selectedCourseData = null;
    },

  },
});

export const {
  setCourseData,
  setCreatorCourseData,
  setSelectedCourseData,   // 👈 EXPORT
  clearSelectedCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
