/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const CertificateCard = ({ certificateData, isEditable, setIsEditing }) => {
  const onClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    console.log(certificateData);
  }, [certificateData]);

  return (
    <Container style={{ margin: '12px 0px' }}>
      <Row>
        <Col sm="6">
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              자격명 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {certificateData.certificateName}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              발급처 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {certificateData.issueAgency}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              등급 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {certificateData.grade}
            </Col>
          </Row>
          <Row>
            <Col sm="auto" style={{ padding: '0', margin: '0', color: 'blue' }}>
              취득일 |
            </Col>
            <Col sm="auto" style={{ padding: '0 0 0 4px', margin: '0' }}>
              {certificateData.acquisitionDate.toLocaleDateString('ko-KR')}
            </Col>
          </Row>
          <RowWrapper />
        </Col>
        <Col sm="2">
          {isEditable && (
            <Button variant="outline-primary" size="sm" onClick={onClick}>
              편집
            </Button>
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
