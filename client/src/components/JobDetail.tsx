import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import ReactTimeAgo from 'react-time-ago';
import LocationIcon from '../icons/LocationIcon';
import HeartIcon from '../icons/HeartIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { useQuery } from '@apollo/client';
import fetchJobDetail from '../queries/fetchJobDetail';
import useJobSearchContext from '../hooks/useJobSearchContext';
import useUserContext from '../hooks/useUserContext';
import { remotiveLogo } from '../utils/links';
import { JobSearchContextType, UserContextType } from '../utils/dataTypes';
import { searchTipLink, postJobLink } from '../utils/links';

type Node = {
  type: string;
  name: string;
  attribs: any;
  children: any[];
};
const transform = (node: Node) => {
  // do not render any <span> tags
  if (node.type === 'tag' && node.name === 'span') {
    return null;
  }

  if (node.children?.length === 0) {
    return null;
  }

  if (node.type === 'br') {
    return null;
  }

  if (node.type === 'tag' && node.name === 'a') {
    node.attribs.target = '_blank';
  }

  if (
    node.type === 'tag' &&
    (node.name === 'p' || node.name === 'div') &&
    node.children.length === 1 &&
    node.children[0].data
  ) {
    if (node.children[0].data.trim().length === 0) {
      return null;
    }
  }
};

type Job = {
  id: string | number;
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

const JobDetail = () => {
  const { id } = useJobSearchContext() as JobSearchContextType;
  const { loggedIn, userJobs, saveSearchJobs } =
    useUserContext() as UserContextType;
  const { loading, error, data } = useQuery(fetchJobDetail, {
    variables: { id }
  });

  const jobIds = userJobs.map((job: Job) => job.id);
  const location = useLocation();

  let description = null;
  let renderedTags = [];

  if (data) {
    const descriptionString = data.job.description.replace(
      /<li.*>\s+<\/li>/g,
      ''
    );
    description = (
      <div className="flex-col space-y-3 font-medium">
        <h3 className="text-xl font-bold">Description</h3>
        {ReactHtmlParser(descriptionString, { transform })}
      </div>
    );
    renderedTags = data.job.tags
      .slice(0, 6)
      .map((tag: string[], index: number) => (
        <li
          key={`tag-${data.job.id}-${index}`}
          className="badge badge-outline rounded font-medium"
          style={{
            marginLeft: '0px',
            marginRight: '0.5rem',
            minWidth: 'fit-content'
          }}
        >
          {tag}
        </li>
      ));
  }

  return (
    <section
      className={`
        ${location.pathname === '/dashboard' ? 'w-full' : 'w-2/3'}
        job-show job-detail card rounded bg-base-100 p-7 h-full
      `}
    >
      {!id && !data && (
        <main className="flex flex-col grow items-center mt-12">
          <img
            src={remotiveLogo}
            alt="remotive-logo"
            width={150}
            height={150}
          />
          <h2 className="text-2xl font-semibold">Job Search Tips</h2>
          <p className="font-medium text-lg">Looking for a remote jobs?</p>
          <p className="font-medium text-lg">
            <a
              href={`${searchTipLink}`}
              target="_blank"
              className="font-semibold text-cyan-500 px-1 underline"
            >
              Here
            </a>
            are your tips to help you work remotely
          </p>
          <button className="btn border-0 mt-5 px-10 rounded bg-cyan-500 hover:bg-neutral-800">
            <a href={`${postJobLink}`} target="_blank">
              <span className="text-white normal-case text-lg font-normal">
                Post a Job
              </span>
            </a>
          </button>
          {!loggedIn && (
            <Link
              to="/signup"
              className="flex items-center text-lg text-cyan-500 mt-5 font-medium"
            >
              Create a Free Account &nbsp; <ArrowRightIcon />
            </Link>
          )}
        </main>
      )}
      {data && loading === false ? (
        <div>
          <div className="flex space-x-8 mb-5">
            <img
              className="h-20"
              src={data.job.company.logo}
              alt="company-logo"
            />
            <div className="flex-col">
              <h3
                className="font-bold cursor-pointer text-2xl"
                onClick={() => console.log('show detail')}
              >
                {data.job.title}
              </h3>
              <h4 className="font-medium text-lg">{data.job.company_name}</h4>
            </div>
          </div>
          <ul className="flex mb-2 flex-wrap gap-2">{renderedTags}</ul>
          <ul className="flex">
            <li
              className="flex items-center font-normal text-lg mb-5"
              style={{ marginLeft: '0px', listStyle: 'unset' }}
            >
              <span className="mr-1">
                <LocationIcon width={19} height={19} />
              </span>
              {data.job.location.length > 0
                ? data.job.location
                : 'Not Specified'}
            </li>
            {data.job.salary.length > 0 && data.job.salary !== '0' ? (
              <li
                className="text-gray-500 font-medium"
                style={{
                  marginLeft: '0.5rem',
                  listStyle: 'unset',
                  paddingTop: '3px'
                }}
              >
                {data.job.salary}
              </li>
            ) : null}
            <li
              style={{
                marginLeft: '0.5rem',
                paddingTop: '3px',
                listStyle: 'unset'
              }}
            >
              <span className="text-base-400 font-medium">
                Posted &nbsp;
                <ReactTimeAgo
                  date={new Date(data.job.publication_date)}
                  locale="en-US"
                />
              </span>
            </li>
          </ul>
          <div className="flex items-center mb-5 space-x-5">
            <a
              role="button"
              className="btn bg-cyan-400 border-0 px-10 rounded hover:bg-neutral-800"
              href={data.job.url}
              target="_blank"
            >
              <span className="text-white normal-case text-lg font-normal">
                Apply now
              </span>
            </a>
            {loggedIn && (
              <button
                className={`save-button btn btn-square rounded ${
                  jobIds.includes(id!)
                    ? 'bg-neutral-800 hover:bg-gray-400'
                    : 'btn-outline border-gray-400'
                }`}
                onClick={() => saveSearchJobs(id!)}
              >
                <HeartIcon color={jobIds.includes(id!) ? 'white' : 'gray'} />
              </button>
            )}
          </div>
          {description}
        </div>
      ) : null}
    </section>
  );
};

export default JobDetail;
