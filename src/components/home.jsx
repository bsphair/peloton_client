/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './home.css';

const Home = () => {
  const generalState = useSelector(state => state.general);

  console.log(generalState);

  return (
    <div className="home-container">
      Home
    </div>
  );
};

export default Home;
