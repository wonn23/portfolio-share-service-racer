/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getCurrentUser } from 'modules/sagas/auth';
import { initWithTokenAuth } from 'modules/reducers/auth';
import { initWithTokenProfile } from 'modules/reducers/profile';
import { useDispatch, useSelector } from 'react-redux';

import { PortfolioPage, LoginPage, RegisterPage, NetworkPage } from './pages';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(({ user, loading }) => ({
    user: user.user,
    error: user.error,
    loading: loading['auth/GET_CURRENT_USER'],
  }));

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      dispatch(initWithTokenAuth(user));
      dispatch(initWithTokenProfile(user));
      console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
    }
  }, [user, dispatch]);

  if (loading) {
    return 'loading...';
  }

  return (
    <Routes>
      <Route path="/" exact element={<PortfolioPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/users/:userId" element={<PortfolioPage />} />
      <Route path="/network" element={<NetworkPage />} />
      <Route path="*" element={<PortfolioPage />} />
    </Routes>
  );
};

export default App;
