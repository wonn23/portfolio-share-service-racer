/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-shadow */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BackgroundCover = () => {
  const { cover, loading } = useSelector(({ musics, loading }) => ({
    cover: musics.cover,
    loading: loading['music/LOAD_COVER'],
  }));

  if (loading) {
    return 'loading...';
  }

  // prettier-ignore
  return(
    <>
      {!loading && cover && (
        <BackgroundImage cover={cover}/>
      )}
    </>
  )
};

export default BackgroundCover;

const BackgroundImage = styled.div`
  background-image: url(data:image/jpeg;base64,${({ cover }) => cover});
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
