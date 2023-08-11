import React from 'react';

type LoadingProps = {
  minWidth?: string;
  minHeight?: string;
};

const Loading: React.FC<LoadingProps> = ({ minWidth, minHeight }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: minHeight ?? 'inherit',
        minWidth: minWidth ?? 'inherit'
      }}
    >
      <span className="loading loading-spinner loading-lg bg-gray-400"></span>
    </div>
  );
};

export default Loading;
