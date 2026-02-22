import React, { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";
import { FaBookOpen, FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";


const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const [photoUrl, setPhotoUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success(result.data?.message || "Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="w-full h-[70px] fixed top-0 flex items-center justify-between px-6 bg-[#000000b1] shadow-md z-[10]">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <h1 className="  text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
          VIRTUAL LEARNING 
        </h1>
      </div>

      {/* Right - User + Buttons */}
      <div className=" items-center gap-4 cursor-pointer lg:flex hidden">
        {!userData? (
          <IoPersonCircle className="w-[40px] h-[40px] text-gray-600 " />
        ) : (
          <div
            className="w-[40px] h-[40px] rounded-full bg-gray-700 text-white flex items-center justify-center font "
            onClick={() => setShow((prev) => !prev)}
          >
          
         { userData.photoUrl? <img
                src={userData.photoUrl}
                className="w-[40px] h-[40px] rounded-full"
                alt="profile"
              />  :<div>{userData?.name?.slice(0, 1).toUpperCase()}</div> }
          </div>
        )}


        {userData?.role === "educator" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            Dashboard
          </button>
        )}

        {!userData ? (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
          >
            Logout
          </button>
        )}

        {/* my profile and my cousre */}
        {show && (
          <div className="absolute top-[110%]  lg:right-[10%] flex flex-col items-start gap-2 text-[15px] rounded-xl bg-white px-4 py-3 border border-gray-200 shadow-lg transition-all duration-300 ease-in-out">
            <span className="px-4 py-2 w-full rounded-lg cursor-pointer bg-gradient-to-r from-white to-white hover:from-red-500 hover:to-orange-600 hover:text-white transition-all duration-300 ease-in-out " onClick={()=>navigate("/profile")}>
              My Profile
            </span>
            <span className="px-4 py-2 w-full rounded-lg cursor-pointer bg-gradient-to-r from-white to-white hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300 ease-in-out">
              My Course
            </span>
          </div>
        )}
      </div>

      {/* end of my course and profile  */}
      {/* Hamburger Menu */}
      <RxHamburgerMenu
        className="w-[30px] h-[30px] lg:hidden text-[#ffffff] cursor-pointer"
        onClick={() => setShowHam((prev) => !prev)}
      />
      <div
        className={`fixed top-0 left-0 w-[60vw] sm:w-[40vw] lg:hidden md:w-[25vw] h-[100vh] bg-[#000000e7] flex flex-col items-center justify-start py-10 gap-6 z-[50] rounded-r-2xl shadow-lg 
        ${showHam ? "translate-x-0 transition duration-500" : "-translate-x-full transition duration-500"}`}
      >
        {/* Close Icon */}
        <GiSplitCross
          className="absolute top-5 right-5 w-[28px] h-[28px] fill-white cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />

        {/* User Info */}
        {!userData ? (
          <IoPersonCircle className="w-[60px] h-[60px] text-gray-400" />
        ) : (
          <div className="w-[60px] h-[60px] rounded-full bg-gray-700 text-white flex items-center justify-center text-xl font-bold">
             { userData.photoUrl? <img
                src={userData.photoUrl}
                className="w-[60px] h-[60px] rounded-full"
                alt="profile"
              />  :<div>{userData?.name?.slice(0, 1).toUpperCase()}</div> }
          </div>
          
        )}

        <h2 className="text-lg font-semibold text-white">{userData?.name || "Ashish"}</h2>
        <p className="text-sm text-gray-400">{userData?.email || "user123@gmail.com"}</p>

        {/* Menu Items */}
        <div className="flex flex-col gap-4 w-[80%] mt-5">
          <button
           onClick={()=>navigate("/profile")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1e293b] text-white hover:bg-[#334155] transition">
            <FaUser /> My Profile
          </button>

          <button 
            onClick={()=> navigate("/course")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1e293b] text-white hover:bg-[#334155] transition">
            <FaBookOpen /> My Courses
          </button>

          {userData?.role === "educator" && (
            <button 
            onClick={()=> navigate("/dashboard")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1e293b] text-white hover:bg-[#334155] transition">
              <FaTachometerAlt /> Dashboard
            </button>
          )}

          {!userData ? (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              LogIn
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
           {/* test button  */}
          <button
              onClick={() => navigate("/dashboard")}
              className=" h-10 w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
             Dev Test Dashboard 
            </button>
             <button
              onClick={() => navigate("/courses")}
              className=" h-10 w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
             Dev Test UI Courses 
            </button>
             <button
              onClick={() => navigate("/createcourses")}
              className=" h-10 w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
             Dev Test createCourse
            </button>
              <button
              onClick={() => navigate("/editcourse")}
              className=" h-10 w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
             Dev Test createCourse
            </button>
        </div>
      </div>
      </div>
  );
};

export default Nav;
