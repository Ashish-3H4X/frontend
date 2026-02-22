import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setLectureData } from "../../redux/lectureSlice";

function CreateLecture() {

  const navigate = useNavigate();
  const { courseId } = useParams();

  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const lectureData = useSelector(
    (state) => state.lecture?.lectureData || []
  );


  // Create Lecture
  const createLectureHandler = async () => {

    if (!lectureTitle.trim()) {
      toast.error("Lecture title is required");
      return;
    }

    setLoading(true);

    try {

      const result = await axios.post(
        serverUrl + `/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );

      dispatch(setLectureData([...lectureData, result.data.lecture]));

      toast.success("Lecture Created");

      setLectureTitle("");

    } catch (error) {

      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");

    } finally {

      setLoading(false);

    }
  };


  // Fetch Lectures
  useEffect(() => {

    const getLecture = async () => {

      try {

        const result = await axios.get(
          serverUrl + `/api/course/courselecture/${courseId}`, // ✅ FIXED
          { withCredentials: true }
        );

        dispatch(setLectureData(result.data.lectures));

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data?.message || "Failed to load lectures"
        );

      }
    };

    getLecture();

  }, [courseId, dispatch]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-6 md:p-8">


        {/* Header */}
        <div className="mb-8 border-b pb-4">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Add New Lecture
          </h1>

          <p className="text-sm text-gray-500">
            Manage and organize your course lectures easily.
          </p>

        </div>


        {/* Input */}
        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lecture Title
          </label>

          <input
            type="text"
            placeholder="e.g. Introduction to MERN Stack"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setLectureTitle(e.target.value)}
            value={lectureTitle}
          />

        </div>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">


          {/* Back */}
          <button
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium transition"
            onClick={() => navigate(`/addcourses/${courseId}`)}
          >
            <FaArrowLeft />
            Back to Course
          </button>


          {/* Create */}
          <button
            className="flex-1 px-5 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition text-sm font-medium shadow-md disabled:opacity-60"
            disabled={loading}
            onClick={createLectureHandler}
          >
            {loading ? (
              <ClipLoader size={22} color="white" />
            ) : (
              "+ Create Lecture"
            )}
          </button>

        </div>


        {/* Lecture List */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">


          {lectureData.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              No lectures added yet.
            </p>
          )}


          {lectureData.map((lecture, index) => (

            <div
              key={lecture._id}
              className="bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center p-3 text-sm font-medium text-gray-700 hover:shadow transition"
            >

              <span className="truncate">
                Lecture {index + 1}: {lecture.lectureTitle}
              </span>

              <FaEdit
                className="text-gray-500 hover:text-black cursor-pointer transition"
                onClick={() =>
                  navigate(`/editlecture/${courseId}/${lecture._id}`)
                }
              />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default CreateLecture;
