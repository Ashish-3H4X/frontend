import React from 'react';
import Nav from "../component/nav"
import home  from "../assets/home.png"
import { TbPlayerPlayFilled } from "react-icons/tb";
import { RiMicAiFill } from "react-icons/ri";
import Logos from '../component/Logos';
import ExploreCourses from '../component/ExploreCourses';
import Categories from '../component/Categories';
import WhyChooseUs from '../component/WhyChooseUs'
import Footer from '../component/Footer.jsx';
import CardPage from '../component/CardPage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full overflow-hidden  bg-white'>
     
     <div className='w-full lg:h-[140vh] h-[70vh] relative'>
      <Nav/>
      {/* <div className='object-cover  md:object-fill w-[100%] lg:h-[100%] h-[50vh] bg-gray-700 bg-gradient-to-br from-orange-500/10 to-yellow-400/10"
'></div> */}
<img src={home}  className='object-cover  md:object-fill w-full lg:h-full h-[50vh] bg-gray-700 bg-gradient-to-br from-orange-500/10 to-yellow-400/10"
'/>
  <span className='   lg:text-[40px] absolute  md:text-[30px] lg:top-[10%] md:mt-[13px] w-[100%] flex items-center justify-center text-white font-bold  text-[20px]  top-[30%]'>Learn from experts, Gain real-world skills</span>
  <span className=' lg:text-[40px] absolute   md:text-[30px] lg:top-[14%] md:pt-[32px] top-[35%] w-[100%] flex items-center justify-center text-white font-bold  text-[20px]'> “Start today. Lead tomorrow.”</span>
       <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center  gap-3 flex-wrap '>
        <button className="px-6 py-2 border-2 border-black  lg:border-white lg:text-white text-black text-[18px] font-medium rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-black hover:text-white lg:hover:bg-white lg:hover:text-black shadow-md hover:shadow-xl" onClick={()=>navigate("/allcourses")}> View All Courses <TbPlayerPlayFilled /> </button>
<button className="px-6 py-2 border-2 border-black  lg:border-white bg-white text-black text-[18px] font-medium rounded-xl flex items-center gap-2 cursor-pointer  shadow-md hover:shadow-xl">Search with Ai <RiMicAiFill /></button>
       </div>
     </div>
      <Logos/>
      <ExploreCourses/>
    
      <Categories/>
        <CardPage/>
     


      <WhyChooseUs/>
     
      <Footer/>

    </div>
  );
}

export default Home;
