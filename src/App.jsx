import React, { useEffect } from "react";
import Home from "./pages/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp.jsx";
import Login from "./pages/login.jsx";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import axios from "axios";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Educator/Dashboard.jsx";
import Courses from "./pages/Educator/Courses.jsx";
import CreateCousres from "./pages/Educator/CreateCousres.jsx";
import getCreatorCourse from "../src/customHooks/getCreatorCourse.js";
import { setUserData } from "./redux/userSlice.js";
import EditCourse from "./pages/Educator/EditCourse.jsx";
import AllCourses from "./pages/AllCourses.jsx";
import CreateLecture from "./pages/Educator/CreateLecture.jsx";
import EditLecture from "./pages/Educator/EditLecture.jsx";
import ViewCourses from "./pages/ViewCourses.jsx";


export const serverUrl = import.meta.env.VITE_API_URL;
const App = () => {
  getCreatorCourse();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/auth/getcurrentuser", {
          withCredentials: true,
        });

        // ✅ dispatch user data to Redux here
        dispatch(setUserData(result.data));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/login"></Navigate>}
        />
        <Route
          path="/forget"
          element={!userData ? <ForgetPassword /> : <Navigate to="/signup" />}
        />
        <Route
          path="/profileedit"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/allcourses"
          element={userData ? <AllCourses /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/dashboard"
          element={
            userData?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createcourses"
          element={
            userData?.role === "educator" ? (
              <CreateCousres />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            userData?.role === "educator" ? (
              <EditCourse />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
           <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
            <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />

<Route
  path="/viewcourse/:courseId"
  element={
    userData ? <ViewCourses /> : <Navigate to="/signup" />
  }
/>
        {/* Testing routes */}

        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
          <Route
          path="/editcourse"
          element={<EditCourse/>}
        />
        <Route
          path="/createcourses"
          element={ <CreateCousres />}
        /> */}
      </Routes>
    </>
  );
};

export default App;
