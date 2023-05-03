/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import DatePicker from 'react-datepicker';
import { addProject } from 'modules/sagas/project';

import { useDispatch } from 'react-redux';

const ProjectAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [projectName, onChangeProjectName] = useInput('');
  const [projectLink, onChangeProjectLink] = useInput('');
  const [introduction, onChangeIntroduction] = useInput('');
  const [startDate, onChangeStartDate] = useState(new Date());
  const [myRole, onChangeMyRole] = useInput('');
  const [detail, onChangeDetail] = useInput('');

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newProjectData = {
      userId: portfolioOwnerId,
      projectName,
      projectLink,
      introduction,
      startDate,
      myRole,
      detail,
    };

    // // 백앤드와 협의
    // // CREATE API Dispatch [POST 타입]
    // // portfolioOwnerId 필요함
    // // 하지만 백엔드 완성 전 리덕스를 활용하여 faker 데이터들 테스트
    dispatch(addProject(newProjectData));

    // console.log(association, contest, startDate, prize, detail);

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
          placeholder="프로젝트 이름을 입력해 주세요."
          value={projectName}
          onChange={onChangeProjectName}
        />
      </Form.Group>

      <Form.Group controlid="formContest" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="링크를 입력해 주세요."
          value={projectLink}
          onChange={onChangeProjectLink}
        />
      </Form.Group>

      <Form.Group controlid="formContest" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="프로젝트 소개 내용을 입력해주세요."
          value={introduction}
          onChange={onChangeIntroduction}
        />
      </Form.Group>

      <Form.Group controlid="formDate" style={{ marginBottom: '12px' }}>
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          dateFormatCalendar="yyyy년 MM월"
          selected={startDate}
          onChange={(date) => onChangeStartDate(date)}
          withPortal
        />
      </Form.Group>

      <Form.Group controlid="formPrize" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="나의 역할을 입력해 주세요."
          value={myRole}
          onChange={onChangeMyRole}
        />
      </Form.Group>

      <FloatingLabel
        controlId="floatingTextarea"
        label="상세 설명을 입력해 주세요."
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          className="form-control"
          placeholder="Leave a comment here"
          value={detail}
          onChange={onChangeDetail}
        />
      </FloatingLabel>

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

export default ProjectAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
