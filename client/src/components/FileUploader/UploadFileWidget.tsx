import React, { ChangeEvent } from 'react';
import axios from 'axios';
import FileUploader from './FileUploader';
import './UploadFileWidget.css';
import useUserContext from '../../hooks/useUserContext';
import { UserContextType } from '../../utils/dataTypes';

const UPLOAD_PRESET = process.env.UPLOAD_PRESET;
const CLOUD_NAME = process.env.CLOUD_NAME;
const FOLDER_NAME = process.env.FOLDER_NAME;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

const URL = `${CLOUDINARY_URL}/${CLOUD_NAME}/image/upload`;
console.log(URL);
const UploadFileWidget = () => {
  const { updateFiles } = useUserContext() as UserContextType;

  const uploadImage = async (img: any) => {
    const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', UPLOAD_PRESET as string);
    data.append('cloud_name', CLOUD_NAME as string);
    data.append('folder', FOLDER_NAME as string);

    const res = await axios.post(URL, data);
    const lastSeparatorIndex = res.data.secure_url.lastIndexOf('.');
    const formattedUrl = res.data.secure_url.substring(0, lastSeparatorIndex) + '.jpg';
    updateFiles(formattedUrl);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImage(e.target.files[0]);
    }
  };

  return (
    <div className="widget-container space-y-4">
      <div className="uploadfile-widget">
        <div className="file-uploaders">
          <FileUploader onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default UploadFileWidget;
