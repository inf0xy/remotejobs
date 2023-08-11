import React from 'react';

type ArrowRightIconProps = {
  width?: number;
  height?: number;
};

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ width, height }) => {
  return (
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8ElEQVR4nO3YsYoCMRAG4KC2Xu9zqI0gSe4a5WrhwIfZZzjrbY5lZiGTBd/Ah9FXuErFQ9FDRJst3Az+H0w/f3YTJjEGAAAAXsRHVQyt8MBo5IQWPvLhVMJ5lmUto8W4Knr/zZ/LRf5RE2K0zLtO6Fd1CBdo7iLvVYewgb680PY2hI9c2tWqYzRAiFTgS6TCYmM/4Cr+dJE2d46855ZwburwwuvGm4/nCtR/vQDvUk6TCCE1f6Fnn0Qu0u5OgHIWQtukzKL5hmDlm4KVb4rqK+WkKN5UX+rH2p9Vjnyk7+vxQFXzF8ehrNZgBgAAACZNf60V835IbmOAAAAAAElFTkSuQmCC"
      width={width ? width : 24}
      height={height ? height : 24}
      alt="arrow right icon"
    />
  );
};

export default ArrowRightIcon;
