import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const CreateCourses = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/create",
        { title, category },
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("Course Created");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-[90%] max-w-3xl bg-white rounded-xl shadow">

        {/* Top Header */}
        <div className="bg-[#1b2a41] text-white px-6 py-4 rounded-t-xl flex items-center gap-3">
          <FaArrowCircleLeft
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => navigate("/courses")}
          />
          <h2 className="text-xl font-semibold">Create Course</h2>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Course Information</h3>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Enter course title"
              className="w-full border p-3 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full border p-3 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 pb-6">
          <button
            disabled={loading}
            onClick={handleCreateCourse}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? <ClipLoader size={28} color="white" /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourses;
