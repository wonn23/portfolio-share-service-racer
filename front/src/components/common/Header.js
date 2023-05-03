/* eslint-disable no-shadow */
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'modules/reducers/user';
import { initAuth } from 'modules/reducers/auth';
import { initProfile } from 'modules/reducers/profile';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onClick = () => {
    sessionStorage.removeItem('userToken');
    dispatch(logout());
    dispatch(initAuth());
    dispatch(initProfile());
    navigate('/');
  };

  return (
    <Nav activeKey={location.pathname}>
      <Nav.Item className="me-auto mb-5">
        <Nav.Link disabled>안녕하세요, 포트폴리오 공유 서비스입니다.</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate('/')}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate('/network')}>네트워크</Nav.Link>
      </Nav.Item>
      {user && (
        <Nav.Item>
          <Nav.Link onClick={onClick}>로그아웃</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Header;
