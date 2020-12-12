import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const HeaderBtn = ({ linkTo, text, Icon }) => {
  return (
    <Link href={linkTo}>
      <button className="ml-2 outline-none focus:outline-none px-2 py-2 rounded-md flex items-center font-medium text-xs text-white tracking-wider bg-purple-500 border-2 border-purple-400">
        <Icon size="18" /> <span className="ml-2">{text}</span>
      </button>
    </Link>
  );
};

HeaderBtn.prototype = {
  linkTo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.node.isRequired,
};
export default HeaderBtn;
