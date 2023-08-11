import React, { useState } from 'react';
import UploadFileWidget from './FileUploader/UploadFileWidget';
import Modal from './Modal';
import useUserContext from '../hooks/useUserContext';
import { UserContextType } from '../utils/dataTypes';

const Resumes = () => {
  const { userFiles, updateFiles } = useUserContext() as UserContextType;
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [buttonShow, setButtonShow] = useState<number | null>(null);

  let renderedResumes = null;

  const handleRemoveFile = (fileUrl: string) => {
    updateFiles(fileUrl);
    setButtonShow(null);
  };

  if (userFiles) {
    renderedResumes = userFiles.map((fileUrl: string, index: number) => (
      <div className="relative" key={`resume-${index}`}>
        {buttonShow === index && (
          <button
            className="btn btn-circle btn-outline absolute top-[-0.3rem] right-[-0.3rem] hover:bg-gray-600 hover:border-transparent"
            style={{ scale: '45%' }}
            onMouseOver={() => setButtonShow(index)}
            onClick={() => handleRemoveFile(fileUrl)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <img
          src={fileUrl}
          alt={`user-resume-${index}`}
          width='auto'
          height={200}
          className="h-[200px] cursor-pointer"
          onClick={() => {
            setCurrentImage(fileUrl);
            setShowModal(true);
          }}
          onMouseOver={() => setButtonShow(index)}
          onMouseLeave={() => setButtonShow(null)}
        />
      </div>
    ));
  }

  return (
    <div className="flex flex-col space-y-7 mt-10">
      <UploadFileWidget />
      <div className="flex space-x-5">{renderedResumes}</div>
      {showModal && (
        <Modal className="modal blur" onClose={() => setShowModal(false)}>
          <div className="max-w-[80vw] max-h-[90vh]">
            <img
              src={currentImage!}
              alt="resume-image"
              style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Resumes;
