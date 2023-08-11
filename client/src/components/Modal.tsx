import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: any;
  className: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    <div>
      <div
        className="fixed inset-0 bg-gray-300 opacity-80 p-10 z-10"
        onClick={onClose}
      ></div>
      <div
        className="fixed inset-0 m-auto bg-white rounded-md w-fit h-fit overflow-auto z-20"
      >
        <div>{children}</div>
      </div>
    </div>,
    document.querySelector('.modal-container') as HTMLElement
  );
};

export default Modal;
