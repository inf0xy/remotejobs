import React from 'react';

interface AlertProps {
  notification: string;
  onClose: () => void
}

const Alert: React.FC<AlertProps> = ({ notification, onClose }) => {
  return (
    <div className="flex alert alert-error absolute top-[64px] text-gray-700 shadow-lg font-medium rounded-none">
      <span className='pl-5'>{notification}</span>
      <button className='text-lg mr-2' onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </button>
    </div>
  );
}

export default Alert;