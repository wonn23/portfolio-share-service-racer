/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import AwardEditForm from './AwardEditForm';
import AwardCard from './AwardCard';

const AwardView = ({ awardData, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <AwardEditForm awardData={awardData} setIsEditing={setIsEditing} />
      ) : (
        <AwardCard
          awardData={awardData}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default AwardView;
