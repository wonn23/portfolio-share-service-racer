/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadEducation } from 'modules/sagas/education';

import Spinners from 'components/common/Spinners';
import EducationAddForm from './EducationAddForm';
import EducationView from './EducationView';

const Education = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  const { educationDatas, error, loading } = useSelector(
    ({ education, loading }) => ({
      educationDatas: education.datas,
      error: education.loadEducationError,
      loading: loading['education/LOAD_EDUCATION'],
    }),
  );

  const [isVisible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  useEffect(() => {
    // 백앤드와 협의
    // Read API Dispatch [GET 타입]
    // portfolioOwnerId 필요함.
    // 하지만 백엔드 완성 전 리덕스를 활용하여 faker 데이터들 테스트

    dispatch(loadEducation(portfolioOwnerId));
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
              학력
            </Card.Title>
            <Card.Text>
              {educationDatas
                ?.filter((data) => data.userId === portfolioOwnerId)
                .map((data) => (
                  <EducationView
                    key={data.id}
                    educationData={data}
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
                <EducationAddForm
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

export default Education;

const ButtonWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  margin: 12px 0;
`;
