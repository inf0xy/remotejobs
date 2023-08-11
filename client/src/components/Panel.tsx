import React from 'react';
import className from 'classnames';

interface PanelProps {
  children: React.ReactNode
  className: string;
  onClick: () => void
}

const Panel: React.FC<PanelProps> = ({ children, ...rest }) => {
  const classes = className(
    'border-t-0 shadow bg-white w-full text-neutral',
    rest.className,
  );
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default Panel;