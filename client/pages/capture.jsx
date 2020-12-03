import { useEffect, useCallback, useState, useRef } from "react";
import jsQR from "jsqr";
import Webcam from "react-webcam";
import { RiCameraLine } from "react-icons/ri";

const videoConstraints = {
  facingMode: "environment",
};

const Camera = () => {
  const [url, setUrl] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [qrData, setQrData] = useState(null);
  const webcamRef = useRef(null);
  const screenshotRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    return;
  };

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    scrollToRef(screenshotRef);
    setImageData(getImageData(webcamRef.current.canvas));
  }, [webcamRef]);

  const getImageData = (canvas) => {
    const ctx = canvas.getContext("2d");
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  };

  useEffect(() => {
    if (imageData) {
      const response = jsQR(
        imageData,
        webcamRef.current.canvas.width,
        webcamRef.current.canvas.height
      );

      if (response) setQrData(response.data);
      else setQrData(null);
    }
  }, [imageData]);

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="max-w-4xl pb-32 mx-auto">
        <div className="relative bg-purple-700 h-36">
          <img
            className="w-1/5 sm:max-w-16 md:max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
            src="/books.svg"
            alt="profile"
          />
        </div>
        <div className="mx-auto mt-8">
          <Webcam
            ref={webcamRef}
            audio={true}
            className="mx-auto w-3/4"
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
          />
        </div>
        {/* Controls */}
        <div className="flex flex-col items-center mt-8 w-3/4 mx-auto">
          <button className="btn-blue" onClick={() => capturePhoto()}>
            <div className="flex items-center justify-between">
              <RiCameraLine /> <span className="ml-2">Capture</span>
            </div>
          </button>
          <h1 className="mt-4 text-xl font-bold">
            Capture Image to See Results!
          </h1>
          <div
            className="mt-8"
            style={{ minHeight: "8rem" }}
            ref={screenshotRef}
          >
            {url && (
              <img
                src={url}
                className="w-1/2 mx-auto rounded shadow"
                alt="Captured!"
              />
            )}
          </div>
        </div>
        {/* Results in tabular form */}
        {url && (
          <div className="w-full bg-purple-700 h-44 mt-16 flex justify-center items-center rounded-lg">
            <h1 className="text-white text-2xl font-bold">
              {qrData ? qrData : "No QR code found, scanning your bookshelf"}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
