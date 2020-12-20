import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { ToastContainer } from "react-toastify";

// import { useOnClickOutside } from "@hooks/useOnClickOutside";

const modalVariant = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "100px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const backdropVariant = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Popup = ({ children, showModal, toggleModal }) => {
  const popupRef = useRef();

  // useOnClickOutside(popupRef, () => toggleModal());

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          variants={backdropVariant}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.div variants={modalVariant}>
            <div
              ref={popupRef}
              className="flex flex-col p-4 bg-white lg:w-3/4 md:w-4/5 sm:w-5/6 m-auto rounded-lg shadow-lg"
              style={{ minHeight: "8rem" }}
            >
              <button
                className="inline-block max-w-max self-end round rounded-full outline-none border-none bg-rose-50 p-2 shadow-sm hover:shadow-md text-red-300 hover:text-red-500"
                onClick={() => toggleModal()}
              >
                <MdClose style={{ fontSize: "1.2rem" }} />
              </button>
              <div className="py-4 px-8">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
