import React, { useCallback, useRef } from "react";
import jsQR from "jsqr";
import Webcam from "react-webcam";
import Popup from "@components/Popup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { RiQrScanFill } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

const videoConstraints = {
  facingMode: "environment",
};

const CameraModal = ({ showModal, toggleModal }) => {
  const webcamRef = useRef();

  const showToast = (type, message) => toast[type](message);

  const takeScreenshot = useCallback(
    () => webcamRef.current.getScreenshot(), // base 64
    [webcamRef]
  );

  const getImageData = (canvas) => {
    const ctx = canvas.getContext("2d");
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  }; // Pixel data

  const scanQRCode = () => {
    takeScreenshot(); // adds a canvas element to webcamRef
    const imageData = getImageData(webcamRef.current.canvas);

    const response = jsQR(
      imageData,
      webcamRef.current.canvas.width,
      webcamRef.current.canvas.height
    );

    if (response) {
      const { data } = response;
      pausePlayer();
      showToast("success", "QR Code detected!");
    } else {
      showToast("error", "QR Code isn't detected. Try again.");
    }
  };

  const clickPhoto = () => {
    const baseUrl = takeScreenshot();

    if (baseUrl) {
      showToast("success", "Image captured!");
      pausePlayer();
    } else {
      showToast("error", "Can't capture image. Try again.");
    }
  };

  const refreshModal = () => {
    toast.dismiss();
    resumePlayer();
  };

  const pausePlayer = () => webcamRef.current.video.pause();
  const resumePlayer = () => webcamRef.current.video.play();

  return (
    <Popup showModal={showModal} toggleModal={toggleModal}>
      <div className="w-full">
        <div className="mx-auto">
          <div className="mx-auto">
            <Webcam
              ref={webcamRef}
              audio={false}
              className="mx-auto rounded-lg shadow-lg md:w-5/6 lg:w-1/2 "
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
              onClick={clickPhoto}
            />
          </div>
          <div className="flex flex-row space-x-4 justify-center mt-8">
            <button
              className="btn-control bg-purple-300 hover:bg-purple-500"
              onClick={() => clickPhoto()}
            >
              <FaCamera />
            </button>
            <button
              className="btn-control bg-orange-300 hover:bg-orange-500"
              onClick={() => scanQRCode()}
            >
              <RiQrScanFill />
            </button>
            <button
              className="btn-control bg-blue-300 hover:bg-blue-500"
              onClick={() => refreshModal()}
            >
              <FiRefreshCcw />
            </button>
            <button
              className="btn-control bg-green-300 hover:bg-green-500"
              onClick={() => toggleModal()}
            >
              <TiTick />
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default CameraModal;
