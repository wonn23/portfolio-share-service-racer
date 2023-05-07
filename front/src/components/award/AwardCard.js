/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteAward } from 'modules/sagas/award';
import moment from 'moment-timezone';
import toDateString from 'lib/util/toDate';

const AwardCard = ({ awardData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteAward(awardData._id));
  };

  return (
    <Container style={{ margin: '12px 0px' }}>
      <Row>
        <Col sm="6">
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              기간명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {awardData.association}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              대회명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {awardData.contest}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              수상 일자 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {`${toDateString(moment(awardData.startDate).tz('Asia/Seoul'))}`}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              수상 내용 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {awardData.prize}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              상세 내용 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {awardData.detail}
            </Col>
          </Row>

          <RowWrapper />
        </Col>
        <Col sm="2">
          {isEditable && (
            <ButtonWrapper>
              <Button variant="outline-primary" size="sm" onClick={onClick}>
                편집
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onClickDelete}
              >
                삭제
              </Button>
            </ButtonWrapper>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AwardCard;

const RowWrapper = styled(Row)`
  border: 2px solid;
  border-image: linear-gradient(to right, blue, white) 1;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  opacity: 0.4;

  padding: 12px 0 0 12px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
