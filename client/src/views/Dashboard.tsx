import React, { Suspense, lazy, useEffect, useState } from 'react';
import useUserContext from '../hooks/useUserContext';
import { UserContextType } from '../utils/dataTypes';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const JobListings = lazy(() => import('../components/JobListings'));
const JobDetail = lazy(() => import('../components/JobDetail'));
const Resumes = lazy(() => import('../components/Resumes'));

const Dashboard = () => {
  const { userJobs } = useUserContext() as UserContextType;
  const [currentTab, setCurrentTab] = useState('saved-jobs');
  const [footer, setFooter] = useState('static bottom-0');

  useEffect(() => {
    if (currentTab === 'my-resumes') {
      setFooter('absolute bottom-0 border-t border-[#e6edf0]');
    } else if (currentTab === 'job-detail') {
      setFooter('static bottom-0 border-t border-[#e6edf0]');
    }
  }, [currentTab]);

  return (
    <>
      <div className="h-fit" style={{ minHeight: 'calc(100vh - 9rem)' }}>
        <div className="pt-28 px-20 pb-12 bg-[#f8f8f8]">
          <ul className="flex text-[#565656] text-lg font-semibold mb-5 space-x-4">
            <li
              id="saved-jobs"
              className={`${
                currentTab === 'saved-jobs' ? 'underline' : ''
              } cursor-pointer underline-offset-4 decoration-2 decoration-cyan-600`}
              onClick={(e) => setCurrentTab((e.target as Element).id)}
            >
              Saved Jobs
            </li>
            <li
              id="job-detail"
              className={`${
                currentTab === 'job-detail' ? 'underline' : ''
              } cursor-pointer underline-offset-4 decoration-2 decoration-cyan-600`}
              onClick={(e) => setCurrentTab((e.target as Element).id)}
            >
              Job Detail
            </li>
            <li
              id="my-resumes"
              className={`${
                currentTab === 'my-resumes' ? 'underline' : ''
              } cursor-pointer underline-offset-4 decoration-2 decoration-cyan-600`}
              onClick={(e) => setCurrentTab((e.target as Element).id)}
            >
              My Porfolio
            </li>
          </ul>
          {currentTab === 'saved-jobs' && (
            <div style={{ minHeight: 'calc(100vh - 14rem)' }}>
              <JobListings jobs={userJobs} setCurrentTab={setCurrentTab} />
            </div>
          )}
          {currentTab === 'job-detail' && <JobDetail />}
          {currentTab === 'my-resumes' && (
            <Suspense fallback={<Loading />}>
              <Resumes />
            </Suspense>
          )}
        </div>
      </div>
      <div className="static bottom-0 w-screen">
        <hr
          className={
            footer.includes('absolute') ? 'absolute bottom-[130px] w-full' : ''
          }
        />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
