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

  /* ================= PARAMS ================= */
const { courseId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= REDUX ================= */
  const { courseData, selectedCourseData } = useSelector(
    (state) => state.course
  );

  const { userData } = useSelector((state) => state.user);

  /* ================= STATE ================= */
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);

  const [isEnrolled, setIsEnrolled] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  /* ================= FIND COURSE ================= */
/* ================= LOAD COURSE ================= */
useEffect(() => {

  const loadCourse = async () => {

    // 1️⃣ Try from Redux first
    if (courseData?.length) {

      const found = courseData.find(
        (c) => c._id.toString() === courseId.toString()
      );

      if (found) {
        dispatch(setSelectedCourseData(found));
        return;
      }
    }

    // 2️⃣ Fallback: Fetch from API
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


  /* ================= CHECK ENROLL ================= */
  useEffect(() => {

    if (!userData || !courseId) return;

    const enrolled = userData?.enrolledCourses?.some((c) => {
      const id = typeof c === "string" ? c : c._id;
      return id?.toString() === courseId.toString();
    });

    setIsEnrolled(enrolled);

  }, [userData, courseId]);

  /* ================= FETCH CREATOR ================= */
  useEffect(() => {

  const getCreator = async () => {

    if (!selectedCourseData?.creator) return;

    try {

      const res = await axios.get(
        `${serverUrl}/api/course/getcreator`,
        { withCredentials: true }
      );

      setCreatorData(res.data);

    } catch (err) {
      console.log("Creator Error:", err);
    }
  };

  getCreator();

}, [selectedCourseData]);
       

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

  /* ================= RATING ================= */
  const getAverageRating = (reviews) => {

    if (!reviews?.length) return 0;

    const sum = reviews.reduce(
      (a, b) => a + b.rating,
      0
    );

    return (sum / reviews.length).toFixed(1);
  };

  const avgRating = getAverageRating(
    selectedCourseData?.reviews
  );

  /* ================= REVIEW ================= */
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

    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  /* ================= ENROLL ================= */
  const handleEnroll = async () => {

    if (!userData?._id) {
      toast.error("Please login first");
      return;
    }

    try {

      const order = await axios.post(
        `${serverUrl}/api/payment/create-order`,
        {
          courseId,
          userId: userData._id,
        },
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

    } catch (err) {
      toast.error("Enroll failed");
    }
  };

  /* ================= LOADING ================= */
  if (!selectedCourseData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  /* ================= UI ================= */
  return (

    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-5 space-y-8">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row gap-6">

          {/* Image */}
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

          {/* Info */}
          <div className="flex-1 space-y-3">

            <h1 className="text-2xl font-bold">
              {selectedCourseData.title}
            </h1>

            <p className="text-gray-600">
              {selectedCourseData.subTitle}
            </p>

            <div>
              ⭐ {avgRating} / 5
            </div>

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

        {/* ================= CURRICULUM ================= */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* List */}
          <div className="border rounded-xl p-4">

            <h2 className="font-bold mb-3">
              Course Curriculum
            </h2>

            {selectedCourseData?.lectures?.map(
              (lec, i) => (

                <button
                  key={i}
                  disabled={!lec.isPreviewFree}
                  onClick={() =>
                    lec.isPreviewFree &&
                    setSelectedLecture(lec)
                  }
                  className={`w-full flex items-center gap-3 p-3 mb-2 rounded border ${
                    lec.isPreviewFree
                      ? "hover:bg-gray-100"
                      : "opacity-50"
                  }`}
                >
                  {lec.isPreviewFree ? (
                    <FaPlayCircle />
                  ) : (
                    <FaLock />
                  )}

                  {lec.lectureTitle}
                </button>
              )
            )}
          </div>

          {/* Video */}
          <div className="border rounded-xl p-4">

            <div className="aspect-video bg-black mb-3 flex items-center justify-center">

              {selectedLecture?.videoUrl ? (

                <video
                  src={selectedLecture.videoUrl}
                    controlsList="nodownload"
                    disablePictureInPicture
                     onContextMenu={(e) => e.preventDefault()}
                    controls
                    className="w-full h-full"
                />

              ) : (

                <span className="text-white text-sm">
                  Select preview lecture
                </span>
              )}
            </div>

            <h3 className="font-semibold">
              {selectedLecture?.lectureTitle}
            </h3>

          </div>

        </div>

        {/* ================= REVIEW ================= */}

        <div className="border-t pt-6">

          <h2 className="font-semibold mb-2">
            Write a Review
          </h2>

          <div className="flex gap-1 mb-2">

            {[1, 2, 3, 4, 5].map((s) => (

              <FaStar
                key={s}
                onClick={() => setRating(s)}
                className={`cursor-pointer ${
                  s <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full border rounded p-2"
            rows="3"
            placeholder="Write review..."
          />

          <button
            onClick={handleReview}
            className="mt-2 bg-black text-white px-4 py-2 rounded"
          >
            Submit
          </button>

        </div>

        {/* ================= INSTRUCTOR ================= */}

        <div className="border-t pt-6 flex gap-4">

          <img
            src={creatorData?.photoUrl || img}
            className="w-16 h-16 rounded-full"
          />

          <div>
            <h3 className="font-semibold">
              {creatorData?.name}
            </h3>

            <p className="text-sm text-gray-600">
              {creatorData?.email}
            </p>
          </div>

        </div>

        {/* ================= RELATED ================= */}

        <div className="border-t pt-6">

          <h2 className="font-semibold mb-3">
            More from Instructor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {relatedCourses.map((item) => (

              <Card
                key={item._id}
                id={item._id}
                thumbnail={item.thumbnail}
                title={item.title}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ViewCourse;
