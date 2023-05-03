/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Modals from 'components/common/Modals';
import DatePicker from 'react-datepicker';
import { updateAward } from 'modules/sagas/award';

const AwardEditForm = ({ awardData, setIsEditing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dispatch = useDispatch();

  const [association, onChangeAssociation] = useInput(awardData.association);
  const [contest, onChangeContest] = useInput(awardData.contest);
  const [startDate, onChangeStartDate] = useState(awardData.startDate);
  const [prize, onChangePrize] = useInput(awardData.prize);
  const [detail, onChangeDetail] = useInput(awardData.detail);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const { id } = awardData;
      const updatedAwardData = {
        id,
        association,
        contest,
        startDate,
        prize,
        detail,
      };

      // 백앤드와 협의
      // Update API Dispatch [PATCH, PUT 타입]
      // educationDataID 필요함
      // 하지만 백엔드 완성 전 리덕스를 활용하여 faker 데이터들 테스트

      dispatch(updateAward(updatedAwardData));
      console.log(updatedAwardData);

      setIsEditing(false);
    }
  }, [
    association,
    awardData,
    contest,
    detail,
    dispatch,
    isConfirmed,
    prize,
    setIsEditing,
    startDate,
  ]);

  const onClick = () => {
    console.log(awardData);
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
            placeholder="기관 이름을 입력해 주세요."
            value={association}
            onChange={onChangeAssociation}
          />
        </Form.Group>

        <Form.Group controlid="formContest" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="대회명을 입력해 주세요."
            value={contest}
            onChange={onChangeContest}
          />
        </Form.Group>

        <Form.Group controlid="formDate" style={{ marginBottom: '12px' }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => onChangeStartDate(date)}
            withPortal
          />
        </Form.Group>

        <Form.Group controlid="formPrize" style={{ marginBottom: '12px' }}>
          <Form.Control
            type="text"
            placeholder="수상명 입력해 주세요."
            value={prize}
            onChange={onChangePrize}
          />
        </Form.Group>

        <FloatingLabel
          controlId="floatingTextarea"
          label="상세내용"
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

export default AwardEditForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
