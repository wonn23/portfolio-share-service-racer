/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { loadCertificate } from 'modules/sagas/certificate';

import Spinners from 'components/common/Spinners';
import CertificateAddForm from './CertificateAddForm';
import CertificateView from './CertificateView';

const Certificate = ({ isEditable, portfolioOwnerId }) => {
  const dispatch = useDispatch();
  // prettier-ignore
  const { certificateDatas, error, loading } = useSelector(
    ({ certificate, loading }) => ({
      certificateDatas: certificate.datas,
      error: certificate.loadCertificateError,
      loading: loading['certificate/LOAD_CERTIFICATE'],
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
    dispatch(loadCertificate(portfolioOwnerId));
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
              자격증
            </Card.Title>
            <Card.Text>
              {certificateDatas
                ?.filter((data) => data.userId === portfolioOwnerId)
                .map((data) => (
                  <CertificateView
                    key={data.id}
                    certificateData={data}
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
                <CertificateAddForm
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

export default Certificate;

const ButtonWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  margin: 12px 0;
`;
