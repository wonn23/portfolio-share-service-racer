/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import ProjectEditForm from './ProjectEditForm';
import ProjectCard from './ProjectCard';

const ProjectView = ({ projectData, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <ProjectEditForm
          projectData={projectData}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProjectCard
          projectData={projectData}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default ProjectView;
