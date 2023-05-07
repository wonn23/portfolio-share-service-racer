/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';

const CertificateView = ({ certificateData, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <CertificateEditForm
          certificateData={certificateData}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          certificateData={certificateData}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default CertificateView;
