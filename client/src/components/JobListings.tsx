import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import fetchJobs from '../queries/fetchJobs';
import useJobSearchContext from '../hooks/useJobSearchContext';
import { JobSearchContextType, JobType } from '../utils/dataTypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import Job from './Job';
import Loading from './Loading';

interface JobListingsProps {
  setCurrentTab?: Dispatch<SetStateAction<string>>;
  setJobCount?: Dispatch<SetStateAction<number | null>>;
  jobs?: JobType[];
}

const JobListings: React.FC<JobListingsProps> = ({
  setCurrentTab,
  setJobCount,
  jobs
}) => {
  const [hasMore, setHasMore] = useState(true);
  const { page, setPage, searchTerm, jobType, locationFilter } =
    useJobSearchContext() as JobSearchContextType;

  const { loading, data } = useQuery(fetchJobs, {
    variables: { page, searchTerm, jobType, locationFilter }
  });

  const [currentJobs, setCurrentJobs] = useState<JobType[]>([]);

  useEffect(() => {
    if (data) {
      setCurrentJobs((prev) => [...prev, ...data.jobs.jobs]);
      if (setJobCount) {
        setJobCount(data.jobs.count);
      }
    }
  }, [data]);

  const location = useLocation();
  let renderedJobs = null;
  const fetchMoreData = () => {
    if (data && currentJobs.length >= data.jobs.count) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  };

  if (currentJobs?.length > 0) {
    renderedJobs = (
      <InfiniteScroll
        className="space-y-5"
        dataLength={currentJobs.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        loader={<div>Loading...</div>}
      >
        {currentJobs.map((job, index) => {
          return (
            <Job
              key={job.id}
              job={job}
              path={location.pathname}
              setCurrentTab={setCurrentTab}
            />
          );
        })}
      </InfiniteScroll>
    );
  }

  return (
    <div
      className={`${
        location.pathname === '/dashboard' ? 'w-full' : 'w-1/3'
      } job-list h-full scroll-smooth space-y-5`}
      id="scrollableDiv"
    >
      {jobs ? (
        <>
          {jobs.map((job, index) => {
            return (
              <Job
                key={job.id}
                job={job}
                path={location.pathname}
                setCurrentTab={setCurrentTab}
              />
            );
          })}
        </>
      ) : (
        <>{currentJobs.length > 0 && renderedJobs}</>
      )}
    </div>
  );
};

export default JobListings;
