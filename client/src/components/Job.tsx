import React, { useRef, Dispatch, SetStateAction, MouseEvent } from 'react';
import ReactTimeAgo from 'react-time-ago';
import LocationIcon from '../icons/LocationIcon';
import HeartIcon from '../icons/HeartIcon';
import useJobSearchContext from '../hooks/useJobSearchContext';
import useUserContext from '../hooks/useUserContext';
import { JobSearchContextType, UserContextType } from '../utils/dataTypes';

interface JobProps {
  job: {
    id: string;
    title: string;
    category: string;
    location: string;
    job_type: string;
    salary: string;
    company_name: string;
    company: { logo: string };
    publication_date: string;
    url: string;
  };
  path: string;
  setCurrentTab?: Dispatch<SetStateAction<string>>;
}

const Job: React.FC<JobProps> = ({ job, path, setCurrentTab }) => {
  const {
    id,
    title,
    category,
    location,
    job_type,
    salary,
    company_name,
    company,
    publication_date,
    url
  } = job;

  const { loggedIn, userJobs, saveSearchJobs } =
    useUserContext() as UserContextType;

  const { setId } = useJobSearchContext() as JobSearchContextType;
  const jobIds = userJobs.map((job) => job.id);
  const savedButtonRef = useRef<HTMLButtonElement>(null);
  const jobRef = useRef<HTMLDivElement>(null);

  const formatText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  const handleShowJobDetail = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.target === jobRef.current ||
      (jobRef.current?.contains(event.target as HTMLDivElement) &&
        event.target !== savedButtonRef.current)
    ) {
      setId(id);
      if (setCurrentTab) {
        setCurrentTab('job-detail');
      }
    }
  };

  return (
    <div
      ref={jobRef}
      className="card rounded bg-base-100 w-full px-7 py-5 space-y-2 hover:bg-[#ebedee] transition ease-in-out duration-300 cursor-pointer"
      onClick={handleShowJobDetail}
    >
      <div className="flex items-center space-x-3 mb-2">
        <img className="h-11" src={company.logo} alt="company-logo" width='auto' height={44} />
        <div className="flex-col w-2/3">
          <h3 className="font-bold cursor-pointer">
            {path === '/dashboard' ? title : formatText(title, 30)}
          </h3>
          <h4 className="font-medium">{company_name}</h4>
        </div>
        {loggedIn && (
          <>
            {path === '/dashboard' && (
              <a
                role="button"
                className="absolute top-4 right-24 btn btn-sm bg-cyan-400 hover:bg-neutral-800 border-0 px-7 rounded"
                href={url}
                target="_blank"
              >
                <span className="text-white text-base normal-case font-normal">
                  Apply now
                </span>
              </a>
            )}
            <button
              ref={savedButtonRef}
              className={`save-button btn  rounded btn-sm btn-square absolute top-4 right-8 ${
                jobIds.includes(id)
                  ? 'bg-neutral-800 hover:bg-gray-400'
                  : 'btn-outline border-gray-400'
              }`}
              onClick={() => saveSearchJobs(id)}
            >
              <HeartIcon
                color={jobIds.includes(id) ? 'white' : 'gray'}
                width={22}
                height={22}
              />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {job_type.length > 0 && (
          <div className="flex items-center justify-center rounded bg-cyan-500 text-white w-20 px-1 py-1 uppercase font-bold text-xs">
            {job_type.replace('_', ' ')}
          </div>
        )}
        <div className="flex items-center justify-center border border-black rounded w-auto px-2 py-1 uppercase font-bold text-xs">
          {category}
        </div>
      </div>
      <div className="flex space-x-3 justify-between">
        <ul className="flex items-center space-x-2">
          <li className="flex items-center font-normal">
            <span className="mr-1">
              <LocationIcon width={18} height={18} />
            </span>
            {location.length > 0
              ? path === '/dashboard'
                ? location
                : formatText(location, 15)
              : 'Not Specified'}
          </li>
          {salary.length > 0 && salary !== '0' ? (
            <li className="text-gray-500 font-medium">{salary}</li>
          ) : null}
        </ul>
        <ReactTimeAgo
          className="italic text-base-400 text-sm font-medium"
          date={new Date(publication_date)}
          locale="en-US"
        />
      </div>
    </div>
  );
};

export default Job;
