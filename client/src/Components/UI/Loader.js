import React from 'react';
import "./loader.css";
import { HashLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='loader--container'>
        <HashLoader color="#3471B0" size={70} />
    </div>
  )
}

export default Loader