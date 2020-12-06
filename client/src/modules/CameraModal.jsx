import React from "react";

import Popup from "@components/Popup";

const CameraModal = ({ showModal, toggleModal }) => (
  <Popup showModal={showModal} toggleModal={toggleModal}>
    <h1>Going to be modal</h1>
  </Popup>
);

export default CameraModal;
