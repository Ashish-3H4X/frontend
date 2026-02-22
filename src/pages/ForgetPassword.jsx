import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { serverUrl } from '../App';




const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: send OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );
      setStep(3);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: reset password
  const resetPassword = async () => {
    if (newpassword !== conpassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, password: newpassword },
        { withCredentials: true }
      );
      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Your Password
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a6ae1]"
                placeholder="ashish227087@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full bg-[#6a6ae1] hover:bg-[#6d6df9] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
            <div
              className="text-sm text-center mt-4 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Back to login
            </div>
          </form>
        </div>
      )}

      {/* Step 2 */}

      {step === 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Please enter the 4-digit code sent to your email.
              </label>
              <input
                type="text"
                id="otp"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a6ae1]"
                placeholder="* * * *"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className="w-full bg-[#6a6ae1] hover:bg-[#6d6df9] text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
              onClick={verifyOtp}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
            <div
              className="text-sm text-center mt-4 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Back to login
            </div>
          </form>
        </div>
      )}

      {/* Step 3 */}
      
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter a new password below to regain access to your account.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a6ae1]"
                placeholder="***********"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newpassword}
              />
            </div>
            <div>
              <label
                htmlFor="conpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="conpassword"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a6ae1]"
                placeholder="***********"
                onChange={(e) => setConPassword(e.target.value)}
                value={conpassword}
              />
            </div>
            <button
              className="w-full bg-[#6a6ae1] hover:bg-[#6d6df9] text-white py-2 px-4 mt-4 rounded-md font-medium cursor-pointer"
              disabled={loading}
              onClick={resetPassword}
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
            <div
              className="text-sm text-center mt-4 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Back to login
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
