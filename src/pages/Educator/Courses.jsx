import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import img from "../../assets/empty.jpg";
// import img1 from "../../assets/tumbnail1.jpg"
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../App";
import axios from "axios";
import { setCreatorCourseData } from "../../redux/courseSlice";

const Courses = () => {
  let navigate = useNavigate();
   const {creatorCourseData} = useSelector((state) => state.course);
   const {userData} = useSelector((state) => state.user);
   const dispatch = useDispatch()
  useEffect(()=>{
 
    const creatorCourse = async () => {
       try {
         const result = await axios.get(serverUrl + "/api/course/getcreator" , {withCredentials:true} )
          dispatch(setCreatorCourseData(result.data))
       } catch (error) {
         console.log(error);
       }   
    }
creatorCourse()
  },[userData])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-[100%] min-h-screen p-4 sm:p-6   bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 ">
          <div className="flex items-center justify-center gap-3">
            <FaArrowLeftLong
              className=" w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-xl font-semibold">Courses</h1>
          </div>
          <button
            className="bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/createcourses")}
          >
            Create Course
          </button>
        </div>
        {/* For larger screens (table layout) */}

        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm  ">
            <thead className="border-b ">
              <tr className="">
                <th className="text-left py-3 px-4 rounded-tl-2xl bg-green-300">
                  Courses
                </th>
                <th className="text-left py-3 px-4  bg-green-300 ">Price</th>
                <th className="text-left py-3 px-4  bg-green-300 ">Status</th>
                <th className="text-left py-3 px-4 rounded-tr-2xl bg-green-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course , index )=>(
              <tr key={index} className="border-b hover:bg-gray-300 transition duration-200">
                <td className="py-3 px-4 flex items-center gap-4">
              { course?.thumbnail ?  <img
                src={course?.thumbnail}
                className="w-30  h-17 object-cover rounded-md object-fit "
                alt=""
              />:<img
                src={img}
                className="w-30  h-17 object-cover rounded-md object-fit "
                alt=""
              />}
                  <span className="font-semibold"> {course?.title} </span>
                </td>
               { course?.price? <td className="px-4  py-3   font-semibold"> ₹ {course?.price} </td>:
                <td className="px-4  py-3   font-semibold"> ₹ NA </td>}
                <td className="px-4  py-3   font-semibold  ">
                  <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ? "bg-green-100 text-green-800" :" bg-red-100 text-red-800 "} `}>
                    {course?.isPublished ? "Published":"Draft"}
                  </span>
                </td>
                <td className="px-[30px]  py-3 font-semibold  ">
                  <FaEdit className=" text-gray-600 hover:text-blue-600 cursor-pointer duration-300" onClick={()=> navigate(`/editcourse/${course?._id}`)} />{" "}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          <p className=" text-center  text-gray-400 mt-6 ">
            {" "}
            A list of your recent courses{" "}
          </p>
        </div>

        {/* for small screen  */}

          <div className="md:hidden space-y-4">
         {creatorCourseData?.map((course , index )=>(
            <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 ">
              <div className="flex gap-4 items-center">
                { course?.thumbnail? <img
                  src={course?.thumbnail}
                  alt=""
                  className="w-30  h-17 rounded-md object-cover"
                /> :
                 <img
                  src={img}
                  alt=""
                  className="w-30  h-17 rounded-md object-cover"
                />}
                <div className="flex-1">
                  <h2 className="font-medium text-sm">{course?.title}</h2>
                 { course?.price? <p className="text-gray-600 text-xs mt-1">₹{course?.price}</p>:
                  <p className="text-gray-600 text-xs mt-2">₹ NA</p>}
                </div>
                <FaEdit className="text-gray-600 hover:text-blue-600 cursor-pointer"  onClick={()=> navigate (`/editcourse/${course?._id}`)} />
              </div>
              <span className={`w-fit px-6 py-2 mx-33 mb-4 text-xs rounded-full ${course.isPublished ? "bg-green-100 text-blue" :" bg-red-100 text-red-800 "}`}>
               {course?.isPublished? "Published":" Draft"}
              </span>
            </div>
             ))}
          <p className="text-center text-sm text-gray-400 mt-4 ">
            A list of your recent courses.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Courses;
