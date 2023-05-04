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

// education API
export const getEducations = (portfolioOwnerId) =>
  API.get('education', portfolioOwnerId);

export const addEducation = ({ userId, school, major, status }) =>
  API.post('education', { userId, school, major, status });

export const updateEducation = ({ _id, school, major, status }) =>
  API.put(`education/${_id}`, { school, major, status });

export const deleteEducation = (_id) => API.del(`education/${_id}`);

// award API
export const getAwards = (portfolioOwnerId) =>
  API.get('award', portfolioOwnerId);

export const addAward = ({
  userId,
  association,
  contest,
  startDate,
  prize,
  detail,
}) =>
  API.post('award', { userId, association, contest, startDate, prize, detail });

export const updateAward = ({
  _id,
  association,
  contest,
  startDate,
  prize,
  detail,
}) =>
  API.put(`award/${_id}`, { association, contest, startDate, prize, detail });

export const deleteAward = (_id) => API.del(`award/${_id}`);

// certificate API
export const getCertificates = (portfolioOwnerId) =>
  API.get('certificate', portfolioOwnerId);

export const addCertificate = ({
  userId,
  agency,
  credit,
  grade,
  acquireDate,
}) => API.post('certificate', { userId, agency, credit, grade, acquireDate });

export const updateCertificate = ({
  _id,
  agency,
  credit,
  grade,
  acquireDate,
}) =>
  API.put(`certificate/${_id}`, {
    agency,
    credit,
    grade,
    acquireDate,
  });

export const deleteCertificate = (_id) => API.del(`certificate/${_id}`);

// project API
export const getProjects = (portfolioOwnerId) =>
  API.get('project', portfolioOwnerId);

export const addProject = ({
  userId,
  projectName,
  projectLink,
  introduction,
  startDate,
  myRole,
  detail,
}) =>
  API.post('project', {
    userId,
    projectName,
    projectLink,
    introduction,
    startDate,
    myRole,
    detail,
  });

export const updateProject = ({
  _id,
  projectName,
  projectLink,
  introduction,
  startDate,
  myRole,
  detail,
}) =>
  API.put(`project/${_id}`, {
    projectName,
    projectLink,
    introduction,
    startDate,
    myRole,
    detail,
  });

export const deleteProject = (_id) => API.del(`project/${_id}`);

// music API
export const getMusicList = (portfolioOwnerId) =>
  API.get('audio', portfolioOwnerId);
export const getMusicCover = (coverID) => API.get('audio/cover', coverID);
export const addMusicSong = (data) => {
  const userId = data.get('userId');
  const title = data.get('title');
  const artist = data.get('artist');
  const coverFile = data.get('coverFile');
  const musicFile = data.get('musicFile');

  return API.post(
    `audio/${userId}`,
    { userId, title, artist, coverFile, musicFile },
    'Music',
  );
};
