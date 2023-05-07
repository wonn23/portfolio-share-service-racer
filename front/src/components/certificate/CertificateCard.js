/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteCertificate } from 'modules/sagas/certificate';
import moment from 'moment-timezone';
import toDateString from 'lib/util/toDate';

const CertificateCard = ({ certificateData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteCertificate(certificateData._id));
  };

  return (
    <Container style={{ margin: '12px 0px' }}>
      <Row>
        <Col sm="6">
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              발급기관 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {certificateData.agency}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              자격증명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {certificateData.credit}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              등급 및 점수 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {certificateData.grade}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              취득 일자 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {`${toDateString(
                moment(certificateData.startDate).tz('Asia/Seoul'),
              )}`}
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

export default CertificateCard;

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
