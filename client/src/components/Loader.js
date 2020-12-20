import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spinner = () => (
    <div>
        <Loader
            type="ThreeDots"
            color="black"
            height={100}
            width={100}
            timeout={3000} // 3 secs
            style={{ zIndex: 100 }}

        />

    </div>
);

export default Spinner;