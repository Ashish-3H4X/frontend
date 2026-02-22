import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Card({ thumbnail, title, category, price, id }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/viewcourse/${id}`);
  };

  return (
    <div
      className="
        w-full
        min-h-[280px]
        bg-white
        rounded-xl
        border
        border-gray-200
        shadow-sm
        hover:shadow-lg
        transition
        overflow-hidden
        flex
        flex-col
      "
    >
      {/* Image */}
      <div className="h-[170px] w-full bg-gray-100 overflow-hidden">
        <img
          src={thumbnail || "/no-image.png"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <span className="text-xs text-blue-600 mb-1 font-medium">
          {category || "General"}
        </span>

        {/* Title */}
        <h2 className="text-sm md:text-base font-semibold line-clamp-2 mb-2">
          {title || "Untitled Course"}
        </h2>

        {/* Bottom */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-green-600 font-bold text-sm">
              {price ? `₹${price}` : "Free"}
            </span>

            <span className="flex items-center gap-1 text-xs text-gray-500">
              <FaStar className="text-yellow-400" />
              4.8
            </span>
          </div>

          {/* View Details Button */}
          <button
            onClick={handleView}
            className="
              w-full
              bg-blue-600
              text-white
              text-sm
              py-2
              rounded-md
              hover:bg-blue-700
              transition
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
