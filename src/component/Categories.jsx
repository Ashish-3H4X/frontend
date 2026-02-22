import React from "react";

const categories = [
  "Web Development",
  "App Development",
  "AI / ML",
  "Ethical Hacking",
  "Data Analytics",
  "Data Science",
  "UI / UX",
  "AI Tools",
];

const Categories = () => {
  return (
    <div className="mt-16 px-8 ">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent text-center ">Popular Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((cat, index) => (
          <div 
            key={index}
            className="bg-white shadow-md rounded-xl py-4 px-5 text-center font-medium hover:shadow-xl cursor-pointer"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
