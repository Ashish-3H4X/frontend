import React from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa";
import { MdOutlineAppShortcut } from "react-icons/md";
import { SiHackster } from "react-icons/si";
import { AiFillOpenAI } from "react-icons/ai";
import { GiMaterialsScience } from "react-icons/gi";
import { BsCpu } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// import { FiPieChart } from "react-icons/fi";
const ExploreCourses = () => {
  const navigate = useNavigate()
  return (
    <div className="w-[100vw] min-h[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">
      {/* left/top */}
      <div className=" w-[100%] lg:w-[350px] lg:h-[100%] h-[480px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px] ">
        <span className=" text-[35px] font-semibold">Explore</span>
        <span className="text-[35px] font-semibold">Our Courses</span>
        <p className="text-[17px]">
          {" "}
          "Start your learning journey with a free trial. Explore instructor-led
          courses designed to help you master skills and build a strong future,
          with lifetime access, personalized support, and a community that grows
          with you."
        </p>
        <button className="px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] tet-[18px] font-light flex gap-3 mt-[40px] cursor-pointer" onClick={()=>navigate("/allcourses")}>
          {" "}
          Explore Courses   <TbPlayerPlayFilled className="mt-[5px]"/>
        </button>
      </div>

      {/* right/bottom  */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
{/* 1 */}
      <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#ffabff] rounded-lg flex items-center justify-center">
             <TbDeviceDesktopAnalytics   className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
  <p className="font-bold"> Web Development </p>
      </div>
{/* 2 */}
        <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#73ccc4] rounded-lg flex items-center justify-center">
             <FaUikit   className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
      <p className="font-bold"> UI UX Designing  </p>
      </div>
{/* 3 */}
           <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#7ae0a6] rounded-lg flex items-center justify-center">
             <MdOutlineAppShortcut   className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
    <p className="font-bold"> App Development  </p>
      </div>

{/* 4 */}


 <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#f19f83] rounded-lg flex items-center justify-center">
             <SiHackster   className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
    <p className="font-bold"> Ethical Hacking </p>
      </div>


{/* 5 */}

 <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#fb6668] rounded-lg flex items-center justify-center">
             <AiFillOpenAI    className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
     <p className="font-bold"> AI/ML  </p>
      </div>


{/* 6 */}

 <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#c18bfb] rounded-lg flex items-center justify-center">
             <GiMaterialsScience   className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
      <p className="font-bold"> Data Science </p>
      </div>


{/* 7 */}

 <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#6eb9ff] rounded-lg flex items-center justify-center">
             <BiLineChart   className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
        <p className="font-bold"> Data Analytics </p>
      </div>


{/* 8 */}
 <div className="w-[100px] h-[130px] font-light text-[11px] flex flex-col gap-3 text-center cursor-pointer">
        <div className=" w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
             <BsCpu   className=" w-[60px] h-[60px] text-[#6d6c6c]" />
        </div>
         <p className="font-bold"> AI Tools </p>
      </div>
      </div>
    </div>
  );
};

export default ExploreCourses;