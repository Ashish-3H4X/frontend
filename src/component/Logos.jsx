import React from 'react';
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";


const Logos = () => {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]'>
       <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-[rgb(162,240,250)] cursor-pointer'> <MdCastForEducation />20K+ Online Courses</div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-[#b4faba] cursor-pointer'> <SiOpenaccess />Lifetime Access</div>
         <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-[#ffe6bd] cursor-pointer'> <FaSackDollar />Value for money</div>
          <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-[#cfafff] cursor-pointer'> <MdSupportAgent />Lifetime Support</div>
           <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-[#a3d9ff] cursor-pointer'> <HiMiniUserGroup />Community Support </div>

    </div>
  );
}

export default Logos;
