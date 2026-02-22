import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ai from "../assets/ai.png";
import Nav from "../component/nav";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import { serverUrl } from "../App";

function AllCourses() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [category, setCategory] = useState([]);

  // Mobile Sidebar Toggle
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);


  // Fetch Courses
  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        serverUrl + "/api/course/getpublished"
      );

      setCourses(res.data);
      setFilterCourses(res.data);

    } catch (err) {

      console.log(err);

    }
  };


  useEffect(() => {
    fetchCourses();
  }, []);


  // Toggle Category
  const toggleCategory = (e) => {

    const value = e.target.value;

    if (category.includes(value)) {

      setCategory(prev => prev.filter(c => c !== value));

    } else {

      setCategory(prev => [...prev, value]);

    }

    // Auto close on mobile
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  };


  // Apply Filter
  useEffect(() => {

    let filtered = [...courses];

    if (category.length > 0) {

      filtered = filtered.filter(course =>
        category.includes(course.category)
      );

    }

    setFilterCourses(filtered);

  }, [category, courses]);


  return (
    <div className="flex min-h-screen bg-gray-50 relative">

      {/* Navbar */}
      <Nav />


      {/* Mobile Toggle Button (Top Center) */}
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className="
          fixed
          top-[90px]
          left-1/2
          -translate-x-1/2
          z-50
          bg-black
          text-white
          px-5
          py-2
          rounded-full
          text-sm
          font-medium
          shadow-md
          md:hidden
        "
      >
        {isSidebarVisible ? "Close Filter" : "Filter"}
      </button>



      {/* Overlay (Mobile) */}
      {isSidebarVisible && (
        <div
          onClick={() => setIsSidebarVisible(false)}
          className="
            fixed
            inset-0
            bg-black/40
            z-30
            md:hidden
          "
        />
      )}



      {/* Sidebar */}
      <aside
        className={`
          w-[260px]
          h-screen
          overflow-y-auto
          bg-black
          fixed
          top-0
          left-0
          p-6
          pt-[130px]
          z-40
          transition-transform
          duration-300

          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        <h2 className="text-xl font-bold flex items-center gap-2 text-white mb-6">

          <FaArrowLeftLong
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />

          Filter by Category

        </h2>


        <form
          className="space-y-4 text-sm bg-gray-700 text-white p-5 rounded-xl"
          onSubmit={(e) => e.preventDefault()}
        >

          {/* AI Button */}
          <button
            type="button"
            className="w-full px-3 py-2 bg-black rounded-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/searchwithai")}
          >
            Search with AI
            <img src={ai} className="w-6 h-6 rounded-full" />
          </button>


          {/* Categories */}
          {[
            "App Development",
            "AI/ML",
            "AI Tools",
            "Data Science",
            "Data Analytics",
            "Ethical Hacking",
            "UI UX Designing",
            "Web Development",
            "Others",
          ].map((item) => (

            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >

              <input
                type="checkbox"
                value={item}
                onChange={toggleCategory}
                className="accent-blue-500"
              />

              {item}

            </label>

          ))}

        </form>

      </aside>



      {/* Main Content */}
      <main
        className="
          w-full
          pt-[130px]
          px-4
          md:pl-[280px]
        "
      >

        {/* Grid */}
        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
          "
        >

          {filterCourses.map((course) => (

            <Card
              key={course._id}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
            />

          ))}

        </div>


        {/* Empty State */}
        {filterCourses.length === 0 && (

          <p className="text-center text-gray-500 mt-10">

            No courses found.

          </p>

        )}

      </main>

    </div>
  );
}

export default AllCourses;
