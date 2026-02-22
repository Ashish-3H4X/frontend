import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditLecture() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseId, lectureId } = useParams();

  const { lectureData } = useSelector((state) => state.lecture);

  const selectedLecture = lectureData.find(
    (lec) => lec._id === lectureId
  );

  const [lectureTitle, setLectureTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);


  // Load existing data
  useEffect(() => {

    if (selectedLecture) {

      setLectureTitle(selectedLecture.lectureTitle || "");
      setIsPreviewFree(selectedLecture.isPreviewFree || false);

    }

  }, [selectedLecture]);


  // Cleanup preview
  useEffect(() => {

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };

  }, [previewUrl]);


  // File Select
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setVideoFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Get duration
    const video = document.createElement("video");
    video.src = url;

    video.onloadedmetadata = () => {
      setVideoDuration(Math.round(video.duration));
    };
  };


  // Update Lecture
  const editLecture = async () => {

    if (!lectureTitle.trim()) {
      toast.error("Lecture title required");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("lectureTitle", lectureTitle);
    formData.append("isPreviewFree", isPreviewFree);

    if (videoFile) {
      formData.append("videoUrl", videoFile);
    }

    try {

      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formData,
        {
          withCredentials: true,

          onUploadProgress: (e) => {

            const percent = Math.round(
              (e.loaded * 100) / e.total
            );

            setUploadProgress(percent);
          },
        }
      );

      const updated = lectureData.map((lec) =>
        lec._id === lectureId ? result.data : lec
      );

      dispatch(setLectureData(updated));

      toast.success("Lecture Updated");

      navigate(`/createlecture/${courseId}`);

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message || "Update failed"
      );

    } finally {

      setLoading(false);
      setUploadProgress(0);

    }
  };


  // Remove Lecture
  const removeLecture = async () => {

    setDeleting(true);

    try {

      await axios.delete(
        serverUrl + `/api/course/removelecture/${lectureId}`,
        { withCredentials: true }
      );

      const filtered = lectureData.filter(
        (lec) => lec._id !== lectureId
      );

      dispatch(setLectureData(filtered));

      toast.success("Lecture Deleted");

      navigate(`/createlecture/${courseId}`);

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");

    } finally {

      setDeleting(false);

    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">


      {/* Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">


        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4">

          <FaArrowLeft
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          />

          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Update Lecture
          </h2>

        </div>


        {/* Delete */}
        <div className="flex justify-end">

          <button
            onClick={removeLecture}
            disabled={deleting}
            className="
              px-4 py-2 rounded-lg text-sm font-medium
              bg-red-600 text-white hover:bg-red-700
              disabled:opacity-60
            "
          >
            {deleting ? (
              <ClipLoader size={18} color="white" />
            ) : (
              "Delete Lecture"
            )}
          </button>

        </div>


        {/* Form */}
        <div className="space-y-5">


          {/* Title */}
          <div>

            <label className="block text-sm font-medium mb-1">
              Lecture Title
            </label>

            <input
              type="text"
              value={lectureTitle}
              onChange={(e) =>
                setLectureTitle(e.target.value)
              }
              className="
                w-full p-3 border rounded-lg text-sm
                focus:ring-2 focus:ring-black
                focus:outline-none
              "
            />

          </div>


          {/* Upload */}
          <div>

            <label className="block text-sm font-medium mb-1">
              Upload Video
            </label>

            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="
                w-full border rounded-lg p-2
                file:bg-black file:text-white
                file:border-0 file:px-4 file:py-2
                file:rounded-md
                hover:file:bg-gray-700
              "
            />

          </div>


          {/* Preview */}
          {(previewUrl || selectedLecture?.videoUrl) && (

            <div className="mt-3 border rounded-lg overflow-hidden bg-black">

              <video
                src={previewUrl || selectedLecture.videoUrl}
                controls
                className="w-full max-h-[220px]"
              />

            </div>

          )}


          {/* Duration */}
          {videoDuration && (

            <p className="text-sm text-gray-600">
              Duration: {Math.floor(videoDuration / 60)}:
              {String(videoDuration % 60).padStart(2, "0")} min
            </p>

          )}


          {/* Free Preview */}
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={isPreviewFree}
              onChange={() =>
                setIsPreviewFree((p) => !p)
              }
              className="accent-black h-4 w-4"
            />

            <span className="text-sm">
              Allow Free Preview
            </span>

          </div>


          {/* Progress */}
          {uploadProgress > 0 &&
            uploadProgress < 100 && (

              <div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-black"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />

                </div>

                <p className="text-xs text-right mt-1 text-gray-500">
                  Uploading {uploadProgress}%
                </p>

              </div>

            )}


        </div>


        {/* Submit */}
        <button
          disabled={loading}
          onClick={editLecture}
          className="
            w-full py-3 rounded-lg
            bg-black text-white text-sm font-medium
            hover:bg-gray-800 transition
            disabled:opacity-60
          "
        >
          {loading ? (
            <ClipLoader size={22} color="white" />
          ) : (
            "Update Lecture"
          )}
        </button>


      </div>

    </div>
  );
}

export default EditLecture;
