/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import DatePicker from 'react-datepicker';
import { addCertificate } from 'modules/sagas/certificate';

import { useDispatch } from 'react-redux';

const CertificateAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [certificateName, onChangeCertificateName] = useInput('');
  const [issueAgency, onChangeIssueAgency] = useInput('');
  const [grade, onChangeGrade] = useInput('');
  const [acquisitionDate, onChangeAcquisitionDate] = useState(new Date());

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newCertificateData = {
      userId: portfolioOwnerId,
      certificateName,
      issueAgency,
      grade,
      acquisitionDate,
    };

    // // 백앤드와 협의
    // // CREATE API Dispatch [POST 타입]
    // // portfolioOwnerId 필요함
    // // 하지만 백엔드 완성 전 리덕스를 활용하여 faker 데이터들 테스트
    dispatch(addCertificate(newCertificateData));

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
          placeholder="자격명을 입력해주세요."
          value={certificateName}
          onChange={onChangeCertificateName}
        />
      </Form.Group>

      <Form.Group controlid="formContest" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="발급처를 입력해주세요."
          value={issueAgency}
          onChange={onChangeIssueAgency}
        />
      </Form.Group>

      <Form.Group controlid="formContest" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="등급 혹은 점수를 입력해주세요."
          value={grade}
          onChange={onChangeGrade}
        />
      </Form.Group>

      <Form.Group controlid="formDate" style={{ marginBottom: '12px' }}>
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          dateFormatCalendar="yyyy년 MM월"
          selected={acquisitionDate}
          onChange={(date) => onChangeAcquisitionDate(date)}
          withPortal
        />
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

export default CertificateAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
