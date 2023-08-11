import React, { useContext } from 'react';
import JobSearchContext from '../context/jobSearch';

const useJobSearchContext = () => {
  return useContext(JobSearchContext);
};

export default useJobSearchContext;