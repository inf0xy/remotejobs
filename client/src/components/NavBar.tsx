import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AvatarIcon from '../icons/AvatarIcon';
import useJobSearchContext from '../hooks/useJobSearchContext';
import useUserContext from '../hooks/useUserContext';
import { JobSearchContextType, UserContextType } from '../utils/dataTypes';
import { navbarBackground } from '../utils/links';

const NavBar = () => {
  const [navBarStyle, setNavBarStyle] = useState('');
  const { setPage, setSearchTerm, setLocationFilter, setJobType, setId } =
    useJobSearchContext() as JobSearchContextType;
  const { loggedIn, logoutAuth } = useUserContext() as UserContextType;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setNavBarStyle(`
        navbar absolute top-0 left-0 bg-transparent text-neutral-content z-10
      `);
    } else if (
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/about' ||
      location.pathname === '/dashboard'
    ) {
      setNavBarStyle(`
        navbar absolute top-0 left-0 bg-black text-neutral-content z-10
      `);
    } else {
      setNavBarStyle('navbar bg-black text-white h-48');
    }
  }, [location]);

  const handleLogout = () => {
    logoutAuth();
    navigate('/login');
  };

  const handleNavigateHome = () => {
    setPage(1);
    setLocationFilter('all');
    setSearchTerm('');
    setJobType('');
    setId(null);
  };

  let activeStyle = {
    fontWeight: 'bold',
    color: 'white'
  };

  return (
    <div
      className={`items-start justify-start ${navBarStyle}`}
      style={
        !navBarStyle.includes('h-48')
          ? { width: '-webkit-fill-available' }
          : {
              width: '-webkit-fill-available',
              backgroundImage: `url(${navbarBackground})`,
              backgroundSize: 'cover'
            }
      }
    >
      <NavLink
        className="logo btn btn-ghost normal-case text-xl mt-2"
        to="/"
        onClick={handleNavigateHome}
      >
        <span>REMOTE</span>JOBS
      </NavLink>
      <ul className="menu-group space-x-7 mr-32 pt-5">
        <li>
          <NavLink
            to="/"
            onClick={handleNavigateHome}
            className="text-gray-300"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jobs"
            onClick={handleNavigateHome}
            className="text-gray-300"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Job Listings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="text-gray-300"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            About
          </NavLink>
        </li>
      </ul>
      {loggedIn ? (
        <div
          className={`space-x-3 ${
            location.pathname === '/jobs' ? 'pt-5' : 'self-center'
          }`}
        >
          <NavLink
            to="/dashboard"
            className="text-3xl text-gray-300"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <span
              className="flex border-2 border-white opacity-90 w-[1.7rem] h-[1.7rem] justify-center items-center pt-1"
              style={{ borderRadius: '50%' }}
            >
              <AvatarIcon width={22} height={22} />
            </span>
          </NavLink>
          <a className={`text-gray-300`} onClick={handleLogout}>
            Logout
          </a>
        </div>
      ) : (
        <ul className="auth-buttons space-x-5 pt-5">
          <li>
            <NavLink
              to="/login"
              className="text-gray-300"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Login
            </NavLink>
          </li>
          <li className="font-medium">
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
