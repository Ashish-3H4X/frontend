import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,} from "recharts";
import img from "../../assets/empty.jpg";
const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const {creatorCourseData} = useSelector((state) => state.course);
  // Sample Data - Replace with real APi /Course data 

  const courseProgressData = [
  {
    name: "Reactjs", // title slice(0,10)+"..."
    lectures: 20
  },
  {
    name: "Nodejs",
    lectures: 15
  },
  {
    name: "MongoDB ",
    lectures: 10
  },
  {
    name: "Express ",
    lectures: 12
  },
  {
    name: "Fullstack ",
    lectures: 25
  }
];
const studentEnrolledData = [
  { name: "Reactjs", students: 120 },
  { name: "Nodejs", students: 80 },
  { name: "MongoDB", students: 60 },
  { name: "Express", students: 95 },
  { name: "Fullstack", students: 150 }
];

 const  totalEarnings = 10000;
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FaArrowLeftLong
        className="absolute top-[3.6%] lg:left-[1.3%] left-[10%]  w-[22px] h-[22px] cursor-pointer"
        onClick={() => navigate("/home")}
      />

      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* Welcome Section  */}

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          {!userData ? (
             <img src={img} alt="" className="w-28 h-28 rounded-full object-cover border-2 border-black shadow-[70px]"/>
          ) : (
            <div className=" w-28 h-28 rounded-full bg-gray-700 text-white flex items-center justify-center text-[70px] font-bold">
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl || img}
                  className="w-28 h-28 rounded-full object-cover border-2 border-black shadow-[70px]"
                  alt="profile"
                />
              ) : (
                <div>{userData?.name?.slice(0, 1).toUpperCase()}</div>
              )}
            </div>
          )}
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome , {userData?.name || "Educator"}
            </h1>
            <h1 className="text-xl font-semibold text-gray-700">
              {" "}
              Total Earning :{" "}
              <span className='font-semibold  text-[#3a3a8f]'>₹{totalEarnings.toLocaleString()}</span>
            </h1>
            <p className="text-[#646f77] font-semibold ">
              {userData?.description ||
                "Start creating amazing courses for your students!"}
            </p>
            <h1
              className="px-[10px] text-center  mt-[10px] py-[10px] border-2  bg-black border-black text-white  rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </h1>
          </div>
        </div>

        {/* graph Section */}

        <div className=" max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* couse graph section  */}
          <div className=" bg-[#ff8e8e] rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 ">
              Course Progress Lectures
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="black" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Enrolled Student Chart */}

          <div className="bg-[#abfece] rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 ">
               Enrolled  Student Graph
            </h2>
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentEnrolledData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
