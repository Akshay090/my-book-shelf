import React from "react";
import PropTypes from "prop-types";

const Header = ({ img, children, bgColor }) => {
  return (
    <div className={`relative h-36 ${bgColor}`}>
      <div className="absolute bottom-2 left-2 my-2 flex items-center">
        {children}
      </div>
      <img
        className="w-1/5 sm:max-w-16 md:max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
        src={img}
        alt="profile"
      />
    </div>
  );
};

Header.propTypes = {
  img: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default Header;
