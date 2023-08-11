import { Dispatch, SetStateAction } from "react";

export type JobType = {
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

export type UserContextType = {
  loggedIn: boolean;
  userJobs: JobType[];
  userFiles: string[];
  loginAuth: (email: string, password: string) => any;
  signupAuth: (email: string, password: string) => any;
  logoutAuth: () => any;
  saveSearchJobs: (id: string | number) => void;
  updateFiles: (fileUrl: string) => void;
}

export type JobSearchContextType = {
  page: number;
  searchTerm: string;
  jobType: string;
  locationFilter: string;
  id: string | null;
  setPage: Dispatch<SetStateAction<number>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setJobType: Dispatch<SetStateAction<string>>;
  setLocationFilter: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<string | null>>;
};