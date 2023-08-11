import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../icons/SearchIcon';
import SelectBar from './SelectBar';
import useJobSearchContext from '../hooks/useJobSearchContext';
import { JobSearchContextType } from '../utils/dataTypes';

type JobSearchContext = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setLocationFilter: Dispatch<SetStateAction<string>>;
  setJobType: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
};

type Option = {
  label: string;
  value: string;
};

const SearchBar = () => {
  const { searchTerm, setSearchTerm, setLocationFilter, setJobType, setPage } =
    useJobSearchContext() as JobSearchContextType;
  const [keyword, setKeyWord] = useState(searchTerm);
  const [location, setLocation] = useState<Option | null>(null);
  const [type, setType] = useState<Option | null>(null);
  const navigate = useNavigate();

  const locationOptions = [
    { label: 'Anywhere', value: 'all' },
    { label: 'Worldwide', value: 'worldwide' },
    { label: 'North America', value: 'northern america' },
    { label: 'Europe', value: 'europe' },
    { label: 'Asia', value: 'asia' },
    { label: 'USA', value: 'usa' },
    { label: 'Canada', value: 'canada' },
    { label: 'UK', value: 'uk' }
  ];

  const jobTypeOptions = [
    { label: 'Any', value: '' },
    { label: 'Full Time', value: 'full_time' },
    { label: 'Part Time', value: 'part_time' },
    { label: 'Internship', value: 'internship' },
    { label: 'Freelance', value: 'freelance' },
    { label: 'Others', value: 'other' }
  ];

  useEffect(() => {
    if (keyword.length) {
      const timeoutId = setTimeout(function () {
        setSearchTerm(keyword);
      }, 500);
      return () => {
        clearTimeout(timeoutId);
      };
    } else if (keyword.length === 0) {
      setSearchTerm('');
    }
  }, [keyword]);

  const handleSelectLocation: (option: Option) => void = (option) => {
    setLocation(option);
    setPage(1);
    setLocationFilter(option.value);
  };

  const handleSelectJobType: (option: Option) => void = (option) => {
    setType(option);
    setPage(1);
    setJobType(option.value);
  };

  const handleSearch = () => {
    navigate('/jobs');
  };

  return (
    <div className="flex space-x-5 h-11 justify-center">
      <input
        className="px-3 border rounded shadow bg-white w-48 text-neutral font-medium placeholder:font-light focus:outline-none"
        placeholder="Job, title, keywords..."
        onChange={(e) => {
          setKeyWord(e.target.value);
          setPage(1);
        }}
        value={keyword}
      />
      <SelectBar
        options={locationOptions}
        value={location!}
        onChange={handleSelectLocation}
        defaultText="Location"
      />
      <SelectBar
        options={jobTypeOptions}
        value={type!}
        onChange={handleSelectJobType}
        defaultText="Job Type"
      />
      <button
        className="rounded hover:bg-neutral bg-cyan-500 border-0 h-full p-0"
        onClick={handleSearch}
      >
        <span className="w-48 flex items-center justify-center normal-case font-normal text-white normal">
          <span className="mr-2">
            <SearchIcon width="18" height="18" />
          </span>{' '}
          Search Job
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
