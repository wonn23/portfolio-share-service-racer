/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-return */
/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { serverUrl } from 'lib/api/client';

import { nextMusic, playMusic, stopMusic } from 'modules/reducers/music';

const Progress = (props, ref) => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const { playList, currentIndex, currentMusicId } = useSelector(
    ({ music }) => ({
      playList: music.playList,
      currentIndex: music.currentIndex,
      currentMusicId: music.currentMusicId,
    }),
  );

  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [audioSrc, setAudioSrc] = useState('');

  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current.play();
    },
    pause: () => {
      audioRef.current.pause();
    },
    changeVolume: (vol) => {
      audioRef.current.volume = vol;
    },
  }));

  const getTime = useCallback((time) => {
    const minutes = `0${parseInt(time / 60, 10)}`;
    const seconds = `0${parseInt(time % 60, 10)}`;
    return `${minutes}:${seconds.slice(-2)}`;
  }, []);

  const onTimeUpdate = useCallback(
    ({ target }) => {
      if (target.readyState === 0) return;
      const { currentTime } = target;
      const { duration } = target;
      const progressBarWidth = (currentTime / duration) * 100;
      progressBarRef.current.style.width = `${progressBarWidth}%`;
      setCurrentTime(getTime(currentTime));
      setDuration(getTime(duration));
    },
    [getTime],
  );

  const onPlay = useCallback(() => {
    console.log('Playing');
    dispatch(playMusic());
  }, [dispatch]);

  const onPause = useCallback(() => {
    console.log('Pause');
    dispatch(stopMusic());
  }, [dispatch]);

  const onEnded = useCallback(() => {
    dispatch(nextMusic());
  }, [dispatch]);

  useEffect(() => {
    if (playList) {
      setAudioSrc(`${serverUrl}audio/music/${playList[currentIndex]?.music}`);
    }
  }, [currentIndex, playList]);

  const setNewCurrentTime = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      if (!audioRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  const onMouseDownProgress = (e) => {
    const newCurrentTime =
      (e.nativeEvent.offsetX / e.currentTarget.clientWidth) *
      audioRef.current.duration;
    setNewCurrentTime(newCurrentTime);
  };

  return (
    <>
      {playList && (
        <ProgressWrapper onMouseDown={onMouseDownProgress}>
          <ProgressBarWrapper className="progress" ref={progressBarRef} />
          <audio
            preload="auto"
            autoPlay
            src={audioSrc}
            ref={audioRef}
            onTimeUpdate={onTimeUpdate}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
          />
          <TimeWrapper>
            <div>{currentTime}</div>
            <div>{duration}</div>
          </TimeWrapper>
        </ProgressWrapper>
      )}
    </>
  );
};

export default forwardRef(Progress);

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

const ProgressBarWrapper = styled.progress`
  position: relative;
  width: 0%;
  height: 1rem;
  ::-webkit-progress-bar {
    background: linear-gradient(to right, #1c7ed6, #7950f2);
  }
  border-radius: 1rem;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 1rem;
  border-radius: 1rem;
  background: #ced4da;
  margin-bottom: 3rem;
`;
