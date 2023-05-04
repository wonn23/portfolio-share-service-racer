/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';

import MusicPanelAddForm from './MusicPanelAddForm';

const MusicPanel = ({ isEditable, portfolioOwnerId }) => {
  const [isVisible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  return (
    <Card style={{ padding: '6px', marginBottom: '1rem' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '1.5rem', fontWeight: '500' }}>
          뮤직
        </Card.Title>

        <ButtonWrapper>
          {isEditable && (
            <Button col="6" onClick={onClick} style={{ opacity: '0.5' }}>
              +
            </Button>
          )}
        </ButtonWrapper>

        <Card.Text>
          {isVisible && (
            <MusicPanelAddForm
              setVisible={setVisible}
              portfolioOwnerId={portfolioOwnerId}
            />
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MusicPanel;

const ButtonWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  margin: 12px 0;
`;
