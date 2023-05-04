/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateEducation } from 'modules/sagas/education';
import Modals from 'components/common/Modals';

const EducationEditForm = ({ educationData, setIsEditing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const [school, onChangeSchool] = useInput(educationData.school);
  const [major, onChangeMajor] = useInput(educationData.major);
  const [status, onChangeStatus] = useInput(educationData.status);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const { _id } = educationData;
      const updatedEducationData = { _id, school, major, status };
      dispatch(updateEducation(updatedEducationData));
      setIsEditing(false);
    }
  }, [
    dispatch,
    educationData,
    isConfirmed,
    major,
    school,
    setIsEditing,
    status,
  ]);

  const onClick = () => {
    console.log(educationData);
    setIsEditing(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmitForm}
        controlid="formEducation"
        style={{ margin: '24px 0 0 0' }}
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
            <div key={`inline-${type}-${educationData.id}`} className="mb-3">
              <Form.Check
                inline
                label="재학중"
                name="group1"
                type={type}
                value="재학중"
                id={`inline-${type}-${educationData.id}-1`}
                onChange={onChangeStatus}
              />
              <Form.Check
                inline
                label="학사졸업"
                name="group1"
                type={type}
                value="학사졸업"
                id={`inline-${type}-${educationData.id}-2`}
                onChange={onChangeStatus}
              />
              <Form.Check
                inline
                label="석사졸업"
                name="group1"
                type={type}
                value="석사졸업"
                id={`inline-${type}-${educationData.id}-3`}
                onChange={onChangeStatus}
              />
              <Form.Check
                inline
                label="박사졸업"
                name="group1"
                type={type}
                value="박사졸업"
                id={`inline-${type}-${educationData.id}-4`}
                onChange={onChangeStatus}
              />
            </div>
          ))}
        </Form.Group>

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

export default EducationEditForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
