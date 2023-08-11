import React from 'react';
import SearchBar from '../components/SearchBar';
import { homepageBackground } from '../utils/links';

const HomePage = () => {
  return (
    <div
      className="hero min-h-screen max-h-screen overflow-hidden absolute top-0 left-0"
      style={{ backgroundImage: `url(${homepageBackground})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="w-full hero-content text-center text-neutral-content">
        <div className="w-full">
          <h1 className="slogan mb-5 text-5xl font-bold">
            Find your dream remote job without the hassle
          </h1>
          <p>
            Remote Jobs is where top talents go to easily access active and fully
            remote job{' '}
          </p>
          <p className="mb-10">opportunities from vetted tech companies.</p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;