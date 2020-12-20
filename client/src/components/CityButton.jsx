import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const CityButton = ({ city, selected }) => {
  const [select, setSelect] = useState(selected);
  return (
    <button
      className={cx({
        'px-2 rounded-md border-2 border-gray-900 mx-2 hover:bg-gray-800 hover:text-white': true,
        'transition duration-300 ease-in': true,
        'bg-gray-800 text-white': select
      })}
      onClick={() => setSelect(prev => !prev)}
    >
      {city}
    </button>
  );
};

CityButton.propTypes = {
  city: PropTypes.string,
  selected: PropTypes.bool
};

export default CityButton;
