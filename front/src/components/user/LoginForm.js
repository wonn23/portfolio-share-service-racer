/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import useInput from 'hooks/useInput';
import { validateEmail, validatePassword } from 'lib/util/validate';
import { login } from 'modules/sagas/auth';
import { relogin } from 'modules/reducers/user';
import styled from 'styled-components';
import { initAuth } from 'modules/reducers/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [onClicked, setOnClicked] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const { user, authError, loading } = useSelector(({ auth, loading }) => ({
    user: auth.auth,
    authError: auth.authError,
    loading: loading['auth/LOGIN'],
  }));

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setOnClicked(true);
  };
  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user && !loading && onClicked) {
      const jwtToken = user.token;
      sessionStorage.setItem('userToken', jwtToken);
      dispatch(relogin(user));

      navigate('/', { replace: true });
    }
  }, [user, navigate, dispatch, loading, onClicked]);

  if (loading) {
    return 'loading...';
  }

  return (
    <div>
      {!loading && (
        <Container>
          <Row className="justify-content-md-center mt-5">
            <Col lg={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="loginEmail">
                  <Form.Label>이메일 주소</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="on"
                    value={email}
                    onChange={onChangeEmail}
                  />
                  {!isEmailValid && (
                    <Form.Text className="text-success">
                      이메일 형식이 올바르지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="loginPassword" className="mt-3">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="on"
                    value={password}
                    onChange={onChangePassword}
                  />
                  {!isPasswordValid && (
                    <Form.Text className="text-success">
                      비밀번호는 4글자 이상입니다.
                    </Form.Text>
                  )}
                </Form.Group>

                {authError && <ErrorMessage>로그인 실패</ErrorMessage>}

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isFormValid}
                    >
                      로그인
                    </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant="light"
                      onClick={() => navigate('/register', { replace: true })}
                    >
                      회원가입하기
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default LoginForm;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
`;
