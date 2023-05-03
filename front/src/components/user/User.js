/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'modules/sagas/user';
import styled from 'styled-components';

import UserEditForm from './UserEditForm';
import UserCard from './UserCard';

const User = ({ portfolioOwnerId, isEditable }) => {
  const dispatch = useDispatch();
  const { fetchUser, fetchError, loading } = useSelector(
    ({ profile, loading }) => ({
      fetchUser: profile.user,
      fetchError: profile.error,
      loading: loading['profile/GET_USER'],
    }),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getUser(portfolioOwnerId));
  }, [dispatch, portfolioOwnerId]);

  useEffect(() => {
    if (fetchError) {
      setError('유저 정보 획득 실패');
    }
  }, [fetchError]);

  useEffect(() => {
    if (fetchUser) {
      setUser(fetchUser);
    }
  }, [fetchUser]);

  if (loading) {
    return 'loading...';
  }

  if (error) {
    return <ErrorMessage>User컴포넌트 에러 발생</ErrorMessage>;
  }

  if (isEditing) {
    return <UserEditForm user={user} setIsEditing={setIsEditing} />;
  }

  return (
    <div>
      {!loading && (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </div>
  );
};

export default User;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;
