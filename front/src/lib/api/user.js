/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import * as API from './api';

// user API
export const register = ({ email, password, name }) =>
  API.post('user/register', { email, password, name });

export const login = ({ email, password }) =>
  API.post('user/login', { email, password });

export const getUsers = () => API.get('userlist');

export const getUser = (portfolioOwnerId) => API.get('users', portfolioOwnerId);

export const getCurrentUser = () => API.get('user/current');

export const updateUser = ({ id, name, email, description }) =>
  API.put(`users/${id}`, { name, email, description });

// award API
export const getAwards = (portfolioOwnerId) =>
  API.get('awards', portfolioOwnerId);

export const addAward = ({ association, contest, prize, detail, date }) =>
  API.post('awards/', { association, contest, prize, detail, date });

export const updateAward = ({
  id,
  association,
  contest,
  prize,
  detail,
  date,
}) => API.put(`awards/${id}`, { association, contest, prize, detail, date });

// project API
export const getProjects = (portfolioOwnerId) =>
  API.get('projects', portfolioOwnerId);

export const addProejct = ({ projectName, projectLink, introduction, startDate, myRole, detail }) =>
  API.post('projects/', { projectName, projectLink, introduction, startDate, myRole, detail });

export const updateProject = ({
  id,
  projectName,
  projectLink,
  introduction,
  startDate,
  myRole,
  detail,
}) => API.put(`projects/${id}`, { projectName, projectLink, introduction, startDate, myRole, detail });

// certificate API
export const getCertificates = (portfolioOwnerId) =>
  API.get('certificates', portfolioOwnerId);

export const addCertificate = ({ certificateName, issueAgency, grade, acqusitionDate }) =>
  API.post('projects/', { certificateName, issueAgency, grade, acqusitionDate });

export const updateCertificate = ({
  id,
  certificateName,
  issueAgency,
  grade,
  acqusitionDate,
}) => API.put(`certificates/${id}`, { certificateName, issueAgency, grade, acqusitionDate });
