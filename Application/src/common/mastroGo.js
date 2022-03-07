import React from 'react';
import mGo from '../assets/images/mstroGo.png'; // Tell webpack this JS file uses this image


console.log(mGo); // /logo.84287d09.png

function mGogo() {
  // Import result is the URL of your image
  return <img className='mstro pulse' src={mGo} alt="mgo-lol" />;


  
}

export default mGogo;