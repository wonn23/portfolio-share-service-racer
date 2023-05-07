/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteProject } from 'modules/sagas/project';
import moment from 'moment-timezone';
import toDateString from 'lib/util/toDate';

const ProjectCard = ({ projectData, isEditable, setIsEditing }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    dispatch(deleteProject(projectData._id));
  };

  return (
    <Container style={{ margin: '12px 0px' }}>
      <Row>
        <Col sm="6">
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              프로젝트명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {projectData.projectName}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              프로젝트 링크 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {projectData.projectLink}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              프로젝트 소개 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {projectData.introduction}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              프로젝트 기간 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {`${toDateString(
                moment(projectData.startDate).tz('Asia/Seoul'),
              )}`}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              나의 역할 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {projectData.myRole}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              상세 설명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {projectData.detail}
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

export default ProjectCard;

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
