/* eslint-disable react/prop-types */
import { nextMusic, prevMusic } from 'modules/reducers/music';
import React, { useCallback } from 'react';
import {
  MusicNoteList,
  PauseFill,
  PlayFill,
  SkipStartFill,
  SkipEndFill,
  VolumeUpFill,
} from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

const EditForm = ({ setShowList, onPlay, onPause, onChangeVolume }) => {
  const dispatch = useDispatch();
  const { playing } = useSelector(({ music }) => ({
    playing: music.playing,
  }));

  const onClickMusicNoteList = useCallback(() => {
    setShowList(true);
  }, [setShowList]);

  const onClickPlayFill = useCallback(() => {
    console.log('onClickPlayFill');
    onPlay();
  }, [onPlay]);

  const onClickPauseFill = useCallback(() => {
    console.log('onClickPauseFill');
    onPause();
  }, [onPause]);

  const onClickSkipStartFill = useCallback(() => {
    console.log('onClickSkipStartFill');
    dispatch(prevMusic());
  }, [dispatch]);

  const onClickSkipEndFill = useCallback(() => {
    console.log('onClickSkipEndFill');
    dispatch(nextMusic());
  }, [dispatch]);

  const onClickVolumeUpFill = useCallback(
    (e) => {
      console.log('onClickVolumeUpFill');
      onChangeVolume(e.target.value);
    },
    [onChangeVolume],
  );

  return (
    <ButtonWrapper>
      <MusicNoteList onClick={onClickMusicNoteList} />
      <SkipStartFill onClick={onClickSkipStartFill} />

      {playing ? (
        <PauseFill onClick={onClickPauseFill} />
      ) : (
        <PlayFill onClick={onClickPlayFill} />
      )}

      <SkipEndFill onClick={onClickSkipEndFill} />
      <VolumeUpFill />
      <InputWrapper
        type="range"
        defaultValue={0.5}
        onClick={onClickVolumeUpFill}
        min="0"
        max="1"
        step="0.01"
      />
    </ButtonWrapper>
  );
};

export default EditForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  cursor: pointer;
`;

const InputWrapper = styled.input`
  -webkit-appearance: none;
  margin-top: 0.5rem;
  background: #ced4da;
  border-radius: 1rem;
  height: 0.5rem;
  accent-color: #7950f2;
  outline: none;
`;
