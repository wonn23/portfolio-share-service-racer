/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';

import { useDispatch } from 'react-redux';
import { addEducation } from 'modules/sagas/education';

const EducationAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [school, onChangeSchool] = useInput('');
  const [major, onChangeMajor] = useInput('');
  const [status, onChangeStatus] = useInput('');

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newEducationData = {
      userId: portfolioOwnerId,
      school,
      major,
      status,
    };

    // 백앤드와 협의
    // CREATE API Dispatch [POST 타입]
    // portfolioOwnerId 필요함
    // 하지만 백엔드 완성 전 리덕스를 활용하여 faker 데이터들 테스트
    dispatch(addEducation(newEducationData));

    setVisible(false);
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      controlid="formEducation"
      style={{ marginLeft: '0px' }}
    >
      <Form.Group controlid="formSchool" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="학교 이름을 입력해 주세요."
          value={school}
          onChange={onChangeSchool}
        />
      </Form.Group>

      <Form.Group controlid="formMajor" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="전공명을 입력해 주세요."
          value={major}
          onChange={onChangeMajor}
        />
      </Form.Group>

      <Form.Group controlid="formStatus" style={{ marginBottom: '8px' }}>
        {['radio'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="재학중"
              name="group1"
              type={type}
              value="재학중"
              id={`inline-${type}-1`}
              onChange={onChangeStatus}
            />
            <Form.Check
              inline
              label="학사졸업"
              name="group1"
              type={type}
              value="학사졸업"
              id={`inline-${type}-2`}
              onChange={onChangeStatus}
            />
            <Form.Check
              inline
              label="석사졸업"
              name="group1"
              type={type}
              value="석사졸업"
              id={`inline-${type}-3`}
              onChange={onChangeStatus}
            />
            <Form.Check
              inline
              label="박사졸업"
              name="group1"
              type={type}
              value="박사졸업"
              id={`inline-${type}-4`}
              onChange={onChangeStatus}
            />
          </div>
        ))}
      </Form.Group>

      <ButtonWrapper>
        <Button variant="primary" type="submit" style={{ marginRight: '4px' }}>
          확인
        </Button>
        <Button
          variant="secondary"
          onClick={onClick}
          style={{ marginLeft: '4px' }}
        >
          취소
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default EducationAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
