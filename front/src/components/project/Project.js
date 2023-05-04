/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadProject } from 'modules/sagas/project';

import Spinners from 'components/common/Spinners';
import ProjectAddForm from './ProjectAddForm';
import ProjectView from './ProjectView';

const Project = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  // prettier-ignore
  const { projectDatas, error, loading } = useSelector(
    ({ project, loading }) => ({
      projectDatas: project.datas,
      error: project.loadProjectError,
      loading: loading['project/LOAD_PROJECT'],
    }),
  );

  const [isVisible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  useEffect(() => {
    dispatch(loadProject(portfolioOwnerId));
  }, [dispatch, portfolioOwnerId]);

  if (loading) {
    return <Spinners />;
  }

  if (error) {
    return 'LOAD ERROR';
  }

  return (
    <div>
      {!loading && (
        <Card style={{ padding: '6px', marginBottom: '1.5rem' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '1.5rem', fontWeight: '500' }}>
              포트폴리오
            </Card.Title>
            <Card.Text>
              {projectDatas?.map((data) => (
                <ProjectView
                  key={data._id}
                  projectData={data}
                  isEditable={isEditable}
                />
              ))}
            </Card.Text>

            <ButtonWrapper>
              {isEditable && (
                <Button col="6" onClick={onClick} style={{ opacity: '0.5' }}>
                  +
                </Button>
              )}
            </ButtonWrapper>

            <Card.Text>
              {isVisible && (
                <ProjectAddForm
                  setVisible={setVisible}
                  portfolioOwnerId={portfolioOwnerId}
                />
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Project;

const ButtonWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  margin: 12px 0;
`;
