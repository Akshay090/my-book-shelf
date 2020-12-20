
import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import computerVision from './computerVision';
import Spinner from './Loader';

const makeblob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const App = props => {
  const [imageUrl, setimageUrl] = useState('');
  const [openCamera, setCamera] = useState(false);
  const [bookTitles, setBookTitles] = useState([]);
  const [showLoader, setLoader] = useState(false);

  const handleTakePhoto = async capturedImage => {
    const binDataImage = capturedImage.replace('data:image/png;base64,', '');
    const blobFile = makeblob(binDataImage, 'image/jpeg');
    setCamera(false);
    // const imgURL = URL.createObjectURL(blobFile);
    setLoader(true);
    const result = await computerVision('', blobFile);
    props.response(result);
    setBookTitles(result);
    setLoader(false);
    props.drawerVisibility(false);
  };

  const handleImageUrl = e => {
    setimageUrl(e.target.value);
  };

  const getDataFromImageUrl = async () => {
    const response = await computerVision(imageUrl, '');
  };

  return (
    <>
      {!showLoader
        ? (
          <div>
            {openCamera ? (
              <div style={{ width: '100%', height: '100%' }}>
                <Camera
                  idealFacingMode="environment"
                  imageType="png"
                  onTakePhoto={dataUri => { handleTakePhoto(dataUri); }}
                  isImageMirror={false}
                />
              </div>

            ) : null}

            {/* UPLOAD IMAGE VIA URL */}
            {/* <input
              placeholder="Enter Image URL"
              value={imageUrl}
              onChange={e => handleImageUrl(e)}
            />
            <button onClick={getDataFromImageUrl}>Get Titles</button> */}

            {/* UPLOAD IMG VIA CAMERA */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
            >
              <div onClick={() => setCamera(true)} style={{ width: '100px', visibility: openCamera ? 'hidden' : 'visible' }}>
                <img src="./book.png" alt="camera" />
                <div style={{ textAlign: 'center' }}>Capture Book Stack OR Spine</div>
              </div>

              {/* UPLOAD IMG VIA QR SCANNER */}
              <div style={{ width: '100px', visibility: openCamera ? 'hidden' : 'visible' }}>
                <img src="./qrCode.png" alt="qrCodeScanner" />
                <div style={{ textAlign: 'center' }}>Scan QR Code</div>
              </div>
            </div>

          </div>
        )
        : <Spinner />}

    </>
  );
};

export default App;
