/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Modals from 'components/common/Modals';
import DatePicker from 'react-datepicker';
import { updateProject } from 'modules/sagas/project';
import moment from 'moment-timezone';

const ProjectEditForm = ({ projectData, setIsEditing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const [projectName, onChangeProjectName] = useInput(projectData.projectName);
  const [projectLink, onChangeProjectLink] = useInput(projectData.projectLink);
  const [introduction, onChangeIntroduction] = useInput(
    projectData.introduction,
  );
  const [startDate, onChangeStartDate] = useState(
    moment(projectData.startDate).tz('Asia/Seoul'),
  );
  const [myRole, onChangeMyRole] = useInput(projectData.myRole);
  const [detail, onChangeDetail] = useInput(projectData.detail);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const { _id } = projectData;
      const updatedProjectData = {
        _id,
        projectName,
        projectLink,
        introduction,
        startDate,
        myRole,
        detail,
      };

      dispatch(updateProject(updatedProjectData));
      console.log(updatedProjectData);

      setIsEditing(false);
    }
  }, [
    dispatch,
    projectData,
    setIsEditing,
    isConfirmed,
    projectName,
    projectLink,
    introduction,
    startDate,
    myRole,
    detail,
  ]);

  const onClick = () => {
    console.log(projectData);
    setIsEditing(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmitForm}
        controlid="formEducation"
        style={{ marginLeft: '0px' }}
      >
        <Form.Group controlid="formSchool" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="프로젝트명을 입력해주세요."
            value={projectName}
            onChange={onChangeProjectName}
          />
        </Form.Group>

        <Form.Group controlid="formContest" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="프로젝트 링크를 입력해주세요."
            value={projectLink}
            onChange={onChangeProjectLink}
          />
        </Form.Group>

        <Form.Group controlid="formPrize" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="프로젝트 소개를 입력해주세요."
            value={introduction}
            onChange={onChangeIntroduction}
          />
        </Form.Group>

        <Form.Group controlid="formDate" style={{ marginBottom: '12px' }}>
          <DatePicker
            selected={startDate.toDate()}
            onChange={(date) =>
              onChangeStartDate(moment(date).tz('Asia/Seoul'))
            }
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
          label="상세 설명"
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
          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: '4px' }}
          >
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

      <Modals
        show={modalShow}
        setModalShow={setModalShow}
        setIsConfirmed={setIsConfirmed}
      />
    </>
  );
};

export default ProjectEditForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
