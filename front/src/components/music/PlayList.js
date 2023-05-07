/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import SortableList from '@ncprog/sortable-list';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentIndex, updatePlayList } from 'modules/reducers/music';

import PlayListItem from './PlayListItem';

const PlayList = ({ setShowList }) => {
  const dispatch = useDispatch();
  const { playList } = useSelector(({ music }) => ({
    playList: music.playList,
  }));

  const onClickX = useCallback(() => {
    setShowList(false);
  }, [setShowList]);

  const onClickItem = useCallback(
    (idx) => {
      console.log(idx);
      dispatch(setCurrentIndex(idx));
    },
    [dispatch],
  );

  const onDropItem = useCallback(
    (updatedPlayList) => {
      console.log(updatedPlayList);
      dispatch(updatePlayList(updatedPlayList));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    (item, idx) => <PlayListItem item={item} idx={idx} />,
    [],
  );

  return (
    <>
      {playList && (
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              PlayList
              <X onClick={onClickX} style={{ cursor: 'pointer' }} />
            </Card.Title>
          </Card.Body>
          <SortableList
            data={playList}
            onClickItem={onClickItem}
            onDropItem={onDropItem}
            renderItem={renderItem}
          />
        </Card>
      )}
    </>
  );
};

export default PlayList;
