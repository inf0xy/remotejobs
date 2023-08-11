import React from 'react';
import './FileUploader.css';

interface FileUploaderProps {
  onChange: (e: any) => void
};

const FileUploader: React.FC<FileUploaderProps> = ({ onChange }) => {
  return (
    <div className="uploader">
      <label htmlFor="file" className="file">
        <input className="custom-file-input" type="file" onChange={onChange} />
      </label>
    </div>
  );
};

export default FileUploader;
