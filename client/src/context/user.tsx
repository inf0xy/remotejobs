import React, { useState, useEffect, createContext } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import fetchCurrentUser from '../queries/fetchCurrentUser';
import fetchUserJobs from '../queries/fetchUserJobs';
import userLogin from '../mutations/userLogin';
import userSignup from '../mutations/userSignup';
import userLogout from '../mutations/userLogout';
import saveJobs from '../mutations/saveJobs';
import saveFiles from '../mutations/saveFiles';
import fetchUserFiles from '../queries/fetchUserFiles';
import { JobType, UserContextType } from '../utils/dataTypes';

type Props = {
  children: React.ReactNode;
};

type Job = {
  id: number;
  title: string;
  category: string;
  location: string;
  company_name: string;
  company: { logo: string };
  tags: string[];
  salary: string;
  job_type: string;
  publication_date: string;
  url: string;
  description: string;
};

type User = {
  id: number;
  email: string;
  savedJobs: Job[];
  savedFiles: string[];
};

type UserJobsResponse = {
  savedJobs: Job[];
};

type UserFilesResponse = {
  user: { savedFiles: string[] }
};

type LoginResponse = {
  id: string;
  email: string;
};

type LoginError = { message: string };

interface ApiResponseError {
  message: string;
  code: number;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userJobs, setUserJobs] = useState<JobType[]>([]);
  const [userFiles, setUserFiles] = useState<string[]>([]);

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation<
      { login: LoginResponse },
      { email: string; password: string },
      ApiResponseError
    >(userLogin);

  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError }
  ] = useMutation(userSignup);
  const [
    logout,
    { data: logoutData, loading: logoutLoading, error: logoutError }
  ] = useMutation(userLogout);
  const [
    saveUserJobs,
    { data: saveJobsData, loading: saveJobsLoading, error: saveJobsError }
  ] = useMutation(saveJobs);
  const [
    saveUserFiles,
    { data: saveFilesData, loading: saveFilesLoading, error: saveFilesError }
  ] = useMutation(saveFiles);
  const { loading, error, data } = useQuery(fetchCurrentUser);

  const [
    getUserJobs,
    { loading: userJobsLoading, error: userJobsError, data: userJobsData }
  ] = useLazyQuery<UserJobsResponse>(fetchUserJobs);

  const [
    getUserFiles,
    { loading: userFilesLoading, error: userFilesError, data: userFilesData }
  ] = useLazyQuery<UserFilesResponse>(fetchUserFiles);

  useEffect(() => {
    getUserFiles({
      fetchPolicy: 'no-cache'
    })
  }, []);

  useEffect(() => {
    if (data?.user?.id) {
      setLoggedIn(true);
      getUserJobs({ variables: { userId: data.user.id } });
    } else {
      setLoggedIn(false);
    }
  }, [data]);

  useEffect(() => {
    if (userJobsData) {
      setUserJobs(userJobsData.savedJobs as unknown as JobType[]);
    }
  }, [userJobsData]);

  useEffect(() => {
    if (userFilesData && userFilesData.user) {
      setUserFiles(userFilesData.user.savedFiles);
    }
  }, [userFilesData]);

  const loginAuth = (email: string, password: string) => {
    return login({
      variables: { email, password },
      refetchQueries: [{ query: fetchCurrentUser }]
    });
  };

  const signupAuth = (email: string, password: string) => {
    return signup({
      variables: { email, password },
      refetchQueries: [{ query: fetchCurrentUser }]
    });
  };

  const logoutAuth = () => {
    return logout({
      refetchQueries: [{ query: fetchCurrentUser }, 'FetchCurrentUser']
    });
  };

  const saveSearchJobs = (jobId: string | number) => {
    saveUserJobs({ variables: { id: data.user.id, jobId } })
      .then(() =>
        getUserJobs({
          fetchPolicy: 'no-cache',
          variables: { userId: data.user.id }
        })
      )
      .catch((err) => console.log(err));
  };

  const updateFiles = (fileUrl: string) => {
    saveUserFiles({ variables: { id: data.user.id, fileUrl } })
      .then(() =>
        getUserFiles({
          fetchPolicy: 'no-cache'
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        loginAuth,
        signupAuth,
        logoutAuth,
        userJobs,
        saveSearchJobs,
        userFiles,
        updateFiles
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
