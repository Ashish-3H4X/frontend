import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import Card from "../component/Card";

function CardPage() {

  const [allCourses, setAllCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  const LOAD_COUNT = 12;


  // Fetch Courses
  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        serverUrl + "/api/course/getpublished"
      );

      setAllCourses(res.data);

      setVisibleCourses(res.data.slice(0, LOAD_COUNT));

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchCourses();
  }, []);


  // Scroll Handler
  const handleScroll = () => {

    const box = scrollRef.current;

    if (!box) return;

    if (box.scrollTop + box.clientHeight >= box.scrollHeight - 80) {
      loadMore();
    }
  };


  // Load More
  const loadMore = () => {

    setVisibleCourses((prev) => {

      const next = allCourses.slice(
        prev.length,
        prev.length + LOAD_COUNT
      );

      return [...prev, ...next];

    });
  };


  return (
    <div className="w-full min-h-screen bg-gray-50 py-14 px-4">


      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">

          Our Popular Courses

        </h1>

        <p className="mt-2 text-gray-600 max-w-xl mx-auto text-sm md:text-base">

          Explore top-rated courses to boost your skills and career.

        </p>

      </div>


      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          max-w-7xl
          mx-auto
          h-[70vh]
          overflow-y-auto
          pr-2
        "
      >


        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
            pb-6
          "
        >


          {/* Loading Skeleton */}
          {loading &&
            [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-[280px] bg-gray-200 rounded-xl animate-pulse"
              />
            ))
          }


          {/* Cards */}
          {!loading &&
            visibleCourses.map((course) => (

              <Card
  key={course._id}
  id={course._id}          // 👈 ADD THIS LINE
  thumbnail={course.thumbnail}
  title={course.title}
  category={course.category}
  price={course.price}
/>


            ))
          }

        </div>


        {/* Load More Text */}
        {!loading &&
          visibleCourses.length < allCourses.length && (

            <p className="text-center py-4 text-gray-500 text-sm">

              Loading more courses...

            </p>

          )
        }

      </div>

    </div>
  );
}

export default CardPage;
