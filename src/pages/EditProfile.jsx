import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App"; //

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(userData?.name || "");
  const [description, setDescription] = useState(userData?.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (photoUrl) formData.append("photoUrl", photoUrl);

    try {
      const result = await axios.put(
        `${serverUrl}/api/auth/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      toast.success("Profile Updated");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowCircleLeft
          className="absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>
        <form className="space-y-5" onSubmit={handleEditProfile}>
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                className="w-20 h-20 rounded-full object-cover border-4 border-black"
                alt="profile"
              />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center text-white justify-center text-[30px] border-2 bg-black border-white">
                {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "?"}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Select Avatar :
            </label>
            <input
              type="file"
              id="image"
              name="photoUrl"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              UserName :
            </label>
            <input
              type="text"
              id="name"
              placeholder={userData?.name}
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email :</label>
            <input
              readOnly
              disabled
              placeholder={userData?.email}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Bio :</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Tell us about yourself"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-0 focus:ring-[black]"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer"
           disabled={loading}>
            {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
