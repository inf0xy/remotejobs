import React, { useState, useRef, useEffect } from 'react';
import ChevronDown from '../icons/ChevronDown';
import Panel from './Panel';

type Option = {
  value: string;
  label: string;
};

interface SelectBarProps {
  options: Option[];
  onChange: (selected: Option) => void;
  value: Option;
  defaultText: string;
}

const SelectBar: React.FC<SelectBarProps> = ({
  options,
  onChange,
  value,
  defaultText
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: React.MouseEvent<HTMLElement>) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler as any, true);
    return () => {
      document.removeEventListener('click', handler as any);
    };
  }, []);

  const handleOptionClick: (selected: Option) => void = (selectedOption) => {
    setIsOpen(false);
    onChange(selectedOption);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const renderOptions = options.map((option) => (
    <div
      key={option.value}
      className="option-item flex hover:bg-cyan-300 cursor-pointer pl-[1.2rem] py-1"
      onClick={() => handleOptionClick(option)}
    >
      {option.label}
    </div>
  ));

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className={`
          flex justify-between items-center cursor-pointer rounded-tl rounded-tr font-light
          ${!isOpen ? 'rounded-bl rounded-br' : ''}
        `}
        onClick={handleToggle}
      >
        <span className="pl-5">{value?.label || defaultText}</span>
        <div
          className={`flex items-center justify-center w-6 bg-base-300 h-11 rounded-tr ${
            !isOpen ? 'rounded-br' : ''
          }`}
        >
          <ChevronDown width={15} height={15}/>
        </div>
      </Panel>
      <Panel
        className={`absolute top-full ${isOpen ? 'panel-show' : 'hidden'}`}
        onClick={() => {}}
      >
        {renderOptions}
      </Panel>
    </div>
  );
};

export default SelectBar;
