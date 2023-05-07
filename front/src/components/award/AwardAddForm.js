/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import DatePicker from 'react-datepicker';
import { addAward } from 'modules/sagas/award';

import { useDispatch } from 'react-redux';

const AwardAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [association, onChangeAssociation] = useInput('');
  const [contest, onChangeContest] = useInput('');
  const [startDate, onChangeStartDate] = useState(new Date());
  const [prize, onChangePrize] = useInput('');
  const [detail, onChangeDetail] = useInput('');

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const newAwardData = {
      userId: portfolioOwnerId,
      association,
      contest,
      startDate,
      prize,
      detail,
    };
    dispatch(addAward(newAwardData));
    setVisible(false);
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      controlid="formEducation"
      style={{ marginLeft: '0px' }}
    >
      <Form.Group controlid="formAssociation" style={{ marginBottom: '12px' }}>
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

      <Form.Group controlid="formStartDate" style={{ marginBottom: '12px' }}>
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

export default AwardAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
