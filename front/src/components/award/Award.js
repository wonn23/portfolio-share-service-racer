/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadAward } from 'modules/sagas/award';

import Spinners from 'components/common/Spinners';
import AwardAddForm from './AwardAddForm';
import AwardView from './AwardView';

const Award = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  // prettier-ignore
  const { awardDatas, error, loading } = useSelector(
    ({ award, loading }) => ({
      awardDatas: award.datas,
      error: award.loadAwardError,
      loading: loading['award/LOAD_AWARD'],
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
    dispatch(loadAward(portfolioOwnerId));
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
        <Card style={{ padding: '6px' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '1.5rem', fontWeight: '500' }}>
              수상 이력
            </Card.Title>
            <Card.Text>
              {awardDatas
                ?.filter((data) => data.userId === portfolioOwnerId)
                .map((data) => (
                  <AwardView
                    key={data.id}
                    awardData={data}
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
                <AwardAddForm
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

export default Award;

const ButtonWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  margin: 12px 0;
`;
