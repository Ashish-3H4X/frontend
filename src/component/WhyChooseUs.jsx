import React from "react";

const features = [
  { title: "Real World Projects", icon: "🚀" },
  { title: "Expert Instructors", icon: "🎓" },
  { title: "Affordable Learning", icon: "💰" },
  { title: "Certificate Included", icon: "📜" },
];

const WhyChooseUs = () => {
  return (
    <div className=" px-8 mb-20">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent text-center ">Why Choose Us?</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div 
            key={i}
            className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <div className="text-lg font-semibold">{f.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
