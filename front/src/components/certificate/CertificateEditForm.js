/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Modals from 'components/common/Modals';
import DatePicker from 'react-datepicker';
import { updateCertificate } from 'modules/sagas/certificate';
import moment from 'moment-timezone';

const CertificateEditForm = ({ certificateData, setIsEditing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const [agency, onChangeAgency] = useInput(certificateData.agency);
  const [credit, onChangeCredit] = useInput(certificateData.credit);
  const [grade, onChangeGrade] = useInput(certificateData.grade);
  const [acquireDate, onChangeAcquireDate] = useState(
    moment(certificateData.startDate).tz('Asia/Seoul'),
  );

  const onSubmitForm = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const { _id } = certificateData;
      const updatedCertificateData = {
        _id,
        agency,
        credit,
        grade,
        acquireDate,
      };
      dispatch(updateCertificate(updatedCertificateData));
      console.log(updatedCertificateData);

      setIsEditing(false);
    }
  }, [
    agency,
    credit,
    dispatch,
    isConfirmed,
    grade,
    setIsEditing,
    acquireDate,
    certificateData,
  ]);

  const onClick = () => {
    console.log(certificateData);
    setIsEditing(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmitForm}
        controlid="formEducation"
        style={{ marginLeft: '0px' }}
      >
        <Form.Group controlid="formAgency" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="발급기관을 입력해 주세요."
            value={agency}
            onChange={onChangeAgency}
          />
        </Form.Group>

        <Form.Group controlid="formCredit" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="자격증명을 입력해 주세요."
            value={credit}
            onChange={onChangeCredit}
          />
        </Form.Group>

        <Form.Group controlid="formGrade" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="등급 및 점수를 입력해 주세요."
            value={grade}
            onChange={onChangeGrade}
          />
        </Form.Group>

        <Form.Group
          controlid="formAcquireDate"
          style={{ marginBottom: '12px' }}
        >
          <Form.Group
            controlid="formStartDate"
            style={{ marginBottom: '12px' }}
          >
            <DatePicker
              selected={acquireDate.toDate()}
              onChange={(date) =>
                onChangeAcquireDate(moment(date).tz('Asia/Seoul'))
              }
              withPortal
            />
          </Form.Group>
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

export default CertificateEditForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
