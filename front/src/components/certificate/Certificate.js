/* eslint-disable no-underscore-dangle */
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
        <Card style={{ padding: '6px', marginBottom: '1.5rem' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '1.5rem', fontWeight: '500' }}>
              자격증 내역
            </Card.Title>
            <Card.Text>
              {certificateDatas?.map((data) => (
                <CertificateView
                  key={data._id}
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
