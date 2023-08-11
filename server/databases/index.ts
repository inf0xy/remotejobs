import company from './company';
import job from './job';
import user from './user';

const { Company, createCompany } = company;
const { Job, createJob, getJobs, getJobDetail } = job;
const { User, updateJobList, fetchSaveJobs, updateUserFiles } = user;

export {
  Company,
  createCompany,
  Job,
  createJob,
  getJobs,
  getJobDetail,
  User,
  updateJobList,
  fetchSaveJobs,
  updateUserFiles
};