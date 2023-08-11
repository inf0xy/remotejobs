import React, { Suspense, lazy, useState, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import useJobSearchContext from '../hooks/useJobSearchContext';
import { JobSearchContextType } from '../utils/dataTypes';
import Loading from '../components/Loading';

const JobListings = lazy(() => import('../components/JobListings'));
const JobDetail = lazy(() => import('../components/JobDetail'));

const MainPage = () => {
  const { page, searchTerm, jobType, locationFilter } =
    useJobSearchContext() as JobSearchContextType;
  const [jobCount, setJobCount] = useState<number | null>(null);

  let resultText = '';

  if (
    page === 1 &&
    searchTerm === '' &&
    jobType === '' &&
    locationFilter === 'all'
  ) {
    resultText = 'All results';
  } else if (jobCount && jobCount > 0) {
    resultText = `${jobCount} matching ${jobCount > 1 ? 'jobs' : 'job'}`;
  } else if (jobCount && jobCount === 0) {
    resultText = 'No jobs matched';
  }

  return (
    <div
      className="flex flex-col bg-[#f8f8f8]"
      style={{
        height: 'calc(100vh - 12rem)',
        maxHeight: 'calc(100vh - 12rem)'
      }}
    >
      <div className="job-board flex justify-center px-20 h-full">
        <div className="absolute top-24 z-20">
          <SearchBar />
        </div>
        <div className="flex flex-col w-full overflow-hidden mt-10">
          <h3 className="text-lg font-medium text-gray-400">{resultText}</h3>
          <div
            className="job-board-content flex mt-4 mb-10 space-x-5 w-full overflow-hidden"
            style={{ height: 'calc(100vh - 16rem)' }}
          >
            <Suspense fallback={<Loading />}>
              <JobListings setJobCount={setJobCount} />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <JobDetail />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
