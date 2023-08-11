import React from 'react';

type AvatarIconProps = {
  width?: number;
  height?: number;
};

const AvatarIcon: React.FC<AvatarIconProps> = ({
  width,
  height
}) => {
  return (
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABb0lEQVR4nO2VO05CQRiFr5hoIVr52AMsAqQ2iqJxCUQLtDGEWCmVj3UYOwkuw4iv1hAW4BMNsVA/M8kh3gYchrmFyT3JVPf7zzlzXxMEsWL9NwGzQBW4At61GsA+MBN1+CrQprdegZUow78VdAZkgAmtLFDTtS9gOYrb3lbATh+uLOYFmPZZoNrduQVbF7vns8C1TDMW7LzYhs8CbzJNWrCTYts+CzwPUGBK7JPPApcyzVqwObEXPgvsyrRmwZ6LrfgsMAc8yrjch6uIeTCfrrcCRubnAnwqoK63PamVC+3cMPkgCgEF/el6yVwrRBW+CNzztwyz4DN4BDgKBdwAJSAVOgvSwBZwK8acGQdm1keBY5l+AEUg0YdNABtijQ6HDc+HwjMDzGVDJZZcw8eBlkyKDvObmm0CYy4F1kPPPOEwPwrcyWPNpcCphksDD/96bMvjxGW4qeHUEAXS3U/TZbhjewJaHM0dV49YsYKo9QOixZ4KLtJpYwAAAABJRU5ErkJggg=="
      width={width ? width : 24}
      height={height ? height : 24}
      alt="avatar icon"
    />
  );
};

export default AvatarIcon;
