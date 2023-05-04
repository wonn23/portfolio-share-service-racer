/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCover } from 'modules/sagas/music';
import { Card } from 'react-bootstrap';

const SongInfo = () => {
  const { playList, currentIndex, cover, loading } = useSelector(
    ({ music, musics, loading }) => ({
      playList: music.playList,
      currentIndex: music.currentIndex,
      cover: musics.cover,
      loading: loading['music/LOAD_COVER'],
    }),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (playList) {
      console.log(playList[currentIndex]?.cover);
      dispatch(loadCover(playList[currentIndex]?.cover));
    }
  }, [currentIndex, dispatch, playList]);

  if (loading) {
    return 'loading...';
  }

  return (
    <>
      {playList && !loading && cover && (
        <Card
          style={{ width: '18rem', margin: 'auto' }}
          className="d-flex justify-content-center align-items-center"
        >
          {cover && (
            <Card.Img variant="top" src={`data:image/jpeg;base64,${cover}`} />
          )}

          <Card.Body style={{ textAlign: 'center' }}>
            {playList[currentIndex]?.title && (
              <Card.Title style={{ fontSize: '1.5rem' }}>
                {playList[currentIndex]?.title}
              </Card.Title>
            )}
            {playList[currentIndex]?.artist && (
              <Card.Text style={{ fontSize: '1.2rem' }}>
                {playList[currentIndex]?.artist}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default SongInfo;
