import React, { useState, createContext } from 'react';
import { JobSearchContextType } from '../utils/dataTypes';

type Props = {
  children: React.ReactNode
};

const JobSearchContext = createContext<JobSearchContextType | null>(null);

export const JobProvider: React.FC<Props> = ({ children }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [id, setId] = useState<string | null>(null);

  return (
    <JobSearchContext.Provider value={
      {
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        jobType,
        setJobType,
        locationFilter,
        setLocationFilter,
        id,
        setId
      }
    }>
      {children}
    </JobSearchContext.Provider>
  );
};

export default JobSearchContext;