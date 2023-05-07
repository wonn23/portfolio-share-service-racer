/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Badge, Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteEducation } from 'modules/sagas/education';

const EducationCard = ({ educationData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteEducation(educationData._id));
  };

  return (
    <Container style={{ margin: '12px 0px' }}>
      <Row>
        <Col sm="6">
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              학교명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {educationData.school}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              전공명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {educationData.major}
            </Col>
            <Col sm="4">
              <Badge bg="primary" style={{ opacity: '0.5' }}>
                {educationData.status}
              </Badge>
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

export default EducationCard;

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
