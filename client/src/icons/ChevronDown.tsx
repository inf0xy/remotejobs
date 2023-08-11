import React from 'react';

type ChevronDownProps = {
  width?: number;
  height?: number;
};

const ChevronDown: React.FC<ChevronDownProps> = ({ width, height }) => {
  return (
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6ElEQVR4nO3UMUoDQRTG8dUiWAg2QtLnAFaWWnkFS9tcwSt4B0t7wcJSbRTWImdIkyZCyhAQyU8WNhDGZXeSTCPMH6Z73/cxb+a9oshkMpkU4BVjDBN6DmvPl7aiNXNcJQi9xNfaNCa44ge3e4SO8L1pWLQUl/5yj94Wgb1aE1K2iY7x2CD6wCAi9BRvDfpnnHSJD6oWYxWIpzhv0Z1hEmgqjzscdrZqw+gai8BoiZt9aqPousWu3YkCfbw3vNtTfUKq2n6c++4/NeQBR0VqNMxmipmPAheYpd5y2+zfz/ok2+uZTOZ/8QttCRmgpVxKagAAAABJRU5ErkJggg=="
      width={width ? width : 24}
      height={height ? height : 24}
      alt="avatar icon"
    />
  );
};

export default ChevronDown;
