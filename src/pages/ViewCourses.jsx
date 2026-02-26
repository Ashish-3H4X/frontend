import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLock, FaPlayCircle, FaStar } from "react-icons/fa";

import { toast } from "react-toastify";
import Card from "../component/Card";
import img from "../assets/empty.jpg";
import { setSelectedCourseData } from "../redux/courseSlice";

function ViewCourse() {

  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseData, selectedCourseData } = useSelector(
    (state) => state.course
  );

  const { userData } = useSelector((state) => state.user);

  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  /* ================= LOAD COURSE ================= */
  useEffect(() => {
    const loadCourse = async () => {

      if (courseData?.length) {
        const found = courseData.find(
          (c) => c._id.toString() === courseId.toString()
        );

        if (found) {
          dispatch(setSelectedCourseData(found));
          return;
        }
      }

      try {
        const res = await axios.get(
          `${serverUrl}/api/course/get/${courseId}`
        );
        dispatch(setSelectedCourseData(res.data));
      } catch (err) {
        console.log("Course fetch error:", err);
      }
    };

    loadCourse();
  }, [courseId, courseData, dispatch]);

  /* ================= SET CREATOR FROM COURSE ================= */
  useEffect(() => {
    if (selectedCourseData?.creator) {
      setCreatorData(selectedCourseData.creator);
    }
  }, [selectedCourseData]);

  /* ================= CHECK ENROLL ================= */
  useEffect(() => {
    if (!userData || !courseId) return;

    const enrolled = userData?.enrolledCourses?.some((c) => {
      const id = typeof c === "string" ? c : c._id;
      return id?.toString() === courseId.toString();
    });

    setIsEnrolled(enrolled);
  }, [userData, courseId]);

  /* ================= RELATED COURSES ================= */
  useEffect(() => {
    if (!creatorData?._id || !courseData?.length) return;

    const filtered = courseData.filter(
      (c) =>
        c.creator === creatorData._id &&
        c._id !== courseId
    );

    setRelatedCourses(filtered);
  }, [creatorData, courseData, courseId]);

  const getAverageRating = (reviews) => {
    if (!reviews?.length) return 0;
    const sum = reviews.reduce((a, b) => a + b.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const avgRating = getAverageRating(
    selectedCourseData?.reviews
  );

  const handleReview = async () => {
    if (!rating || !comment) {
      toast.error("Please give rating & comment");
      return;
    }

    try {
      await axios.post(
        `${serverUrl}/api/review/givereview`,
        { rating, comment, courseId },
        { withCredentials: true }
      );

      toast.success("Review Added");
      setRating(0);
      setComment("");
    } catch {
      toast.error("Failed to submit review");
    }
  };

  const handleEnroll = async () => {
    if (!userData?._id) {
      toast.error("Please login first");
      return;
    }

    try {
      const order = await axios.post(
        `${serverUrl}/api/payment/create-order`,
        { courseId, userId: userData._id },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.data.amount,
        currency: "INR",
        name: "Virtual Courses",
        description: "Course Payment",
        order_id: order.data.id,
        handler: async (response) => {
          try {
            await axios.post(
              `${serverUrl}/api/payment/verify-payment`,
              {
                ...response,
                courseId,
                userId: userData._id,
              },
              { withCredentials: true }
            );

            toast.success("Enrolled Successfully");
            setIsEnrolled(true);
          } catch {
            toast.error("Payment Failed");
          }
        },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error("Enroll failed");
    }
  };

  if (!selectedCourseData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-5 space-y-8">

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              className="mb-2 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <img
              src={selectedCourseData.thumbnail || img}
              alt="course"
              className="rounded-xl w-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            <h1 className="text-2xl font-bold">
              {selectedCourseData.title}
            </h1>

            <p className="text-gray-600">
              {selectedCourseData.subTitle}
            </p>

            <div>⭐ {avgRating} / 5</div>

            <div className="text-xl font-semibold">
              ₹{selectedCourseData.price || "Free"}
            </div>

            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Enroll Now
              </button>
            ) : (
              <button
                onClick={() =>
                  navigate(`/viewlecture/${courseId}`)
                }
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Watch Now
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewCourse;