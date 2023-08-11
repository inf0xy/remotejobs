import React from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import InstagramIcon from '../icons/InstagramIcon';
import TwitterIcon from '../icons/TwitterIcon';
import { remotiveLinks } from '../utils/links';

const Footer = () => {
  return (
    <footer
      className={`static bottom-0 flex flex-col items-center justify-center bg-[#f8f8f8] w-full space-y-2 min-h-[8rem] h-[8rem] max-h-[8rem]`}
    >
      <p className="text-gray-400 font-medium italic">
        Disclaimer: This site content belongs to Remotive
      </p>
      <div className="flex space-x-2">
        <a
          href={`${remotiveLinks.remotiveFacebookLink}`}
          target="_blank"
          className="p-1 rounded-md hover:bg-gray-200 ease duration-300"
        >
          <FacebookIcon />
        </a>
        <a
          href={`${remotiveLinks.remotiveLinkedinLink}`}
          target="_blank"
          className="p-1 rounded-md hover:bg-gray-200 ease duration-300"
        >
          <LinkedinIcon />
        </a>
        <a
          href={`${remotiveLinks.remotiveInstagramLink}`}
          target="_blank"
          className="p-1 rounded-md hover:bg-gray-200 ease duration-300"
        >
          <InstagramIcon />
        </a>
        <a
          href={`${remotiveLinks.remotiveTwitterLink}`}
          target="_blank"
          className="p-1 rounded-md hover:bg-gray-200 ease duration-300"
        >
          <TwitterIcon />
        </a>
      </div>
      <p className="text-gray-400 font-medium">Remote Jobs &copy; 2023</p>
    </footer>
  );
};

export default Footer;
