import React, { useEffect, useRef, useState } from 'react';
import { FaCamera, FaTrash, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img from "../../assets/empty.jpg";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const { creatorCourseData } = useSelector(state => state.course);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const thumbnailRef = useRef();

  // Fetch course by ID
  const getCourseById = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );

      setSelectedCourse(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Course not found");
    }
  };

  useEffect(() => { getCourseById(); }, []);

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "");
      setSubTitle(selectedCourse.subTitle || "");
      setDescription(selectedCourse.description || "");
      setCategory(selectedCourse.category || "");
      setLevel(selectedCourse.level || "");
      setPrice(selectedCourse.price || "");
      setFrontendImage(selectedCourse.thumbnail || img);
      setIsPublished(selectedCourse.isPublished);
    }
  }, [selectedCourse]);


  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };


  // Save Edited Course
  const editCourseHandler = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("isPublished", isPublished);
    if (backendImage) formData.append("thumbnail", backendImage);

    try {
      const result = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );

      const updatedCourse = result.data;

      let updatedList = creatorCourseData ? [...creatorCourseData] : [];
      const index = updatedList.findIndex(c => c._id === courseId);

      if (index !== -1) {
        updatedList[index] = updatedCourse;
      }

      dispatch(setCreatorCourseData(updatedList));

      toast.success("Course updated");
      navigate("/courses");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }

    setLoading(false);
  };


  // Delete Course
  const removeCourse = async () => {
    setLoading(true);

    try {
      await axios.delete(
        `${serverUrl}/api/course/remove/${courseId}`,
        { withCredentials: true }
      );

      const updatedList =
        creatorCourseData?.filter(c => c._id !== courseId) || [];

      dispatch(setCreatorCourseData(updatedList));

      toast.success("Course deleted");
      navigate("/courses");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove");
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gray-800 text-white flex justify-between items-center px-6 py-4">
          <h2 className="text-lg font-semibold">Edit Course</h2>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
            onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}
          >
            Go to Lectures Page →
          </button>
        </div>


        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Course Information</h3>

            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Title"
                className="w-1/2 border rounded-lg px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Subtitle"
                className="w-1/2 border rounded-lg px-4 py-2"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />
            </div>

            <textarea
              placeholder="Description"
              rows="3"
              className="w-full border rounded-lg px-4 py-2 mb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <h4 className="font-semibold mb-2">Settings</h4>

            <div className="flex gap-4 mb-4">

              <select
                className="w-1/3 border rounded-lg px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
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

              <select
                className="w-1/3 border rounded-lg px-3 py-2"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Course Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <input
                type="number"
                placeholder="Price (₹)"
                className="w-1/3 border rounded-lg px-3 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>


          {/* Right */}
          <div className="flex flex-col items-center space-y-5">
            <h3 className="text-lg font-semibold">Thumbnail & Actions</h3>

            <label
              htmlFor="thumbnail"
              className="border-2 border-dashed rounded-lg w-48 h-36 flex flex-col items-center justify-center cursor-pointer"
            >
              <FaCamera size={22} />
              <p className="text-sm mt-2">Upload Image</p>

              <input
                type="file"
                id="thumbnail"
                className="hidden"
                onChange={handleThumbnail}
              />
            </label>

            {frontendImage && (
              <img
                src={frontendImage}
                alt="Thumbnail"
                className="w-48 h-36 object-cover rounded-lg border"
              />
            )}

            <button
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg w-48"
              onClick={() => setIsPublished(prev => !prev)}
            >
              <FaCheckCircle />
              {isPublished ? "Unpublish" : "Publish"}
            </button>

            <button
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg w-48"
              disabled={loading}
              onClick={removeCourse}
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : <FaTrash />}
              Delete
            </button>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-48"
              disabled={loading}
              onClick={editCourseHandler}
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Save"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditCourse;
