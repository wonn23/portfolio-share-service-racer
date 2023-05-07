/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from 'hooks/useInput';

import { useDispatch } from 'react-redux';
import { addMusic } from 'modules/sagas/music';

const MusicPanelAddForm = ({ setVisible, portfolioOwnerId }) => {
  const dispatch = useDispatch();

  const [title, onChangeTitle] = useInput('');
  const [artist, onChangeArtist] = useInput('');
  const [coverFile, setCoverFile] = useState(null);
  const [musicFile, setMusicFile] = useState(null);

  const onChangeCoverFile = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const onChangeMusicFile = (e) => {
    setMusicFile(e.target.files[0]);
  };

  const onClick = () => {
    setVisible(false);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', portfolioOwnerId);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('coverFile', coverFile);
    formData.append('musicFile', musicFile);

    const formDataObj = Object.fromEntries(formData);
    console.log(formDataObj);

    dispatch(addMusic(formData));
    // window.location.reload();

    setVisible(false);
  };

  return (
    <Form
      onSubmit={onSubmitForm}
      controlid="formMusic"
      style={{ marginLeft: '0px' }}
      encType="multipart/form-data"
    >
      <Form.Group controlid="formTitle" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="타이틀을 입력해주세요."
          value={title}
          onChange={onChangeTitle}
        />
      </Form.Group>

      <Form.Group controlid="formArtist" style={{ marginBottom: '12px' }}>
        <Form.Control
          type="text"
          placeholder="아티스트를 입력해주세요."
          value={artist}
          onChange={onChangeArtist}
        />
      </Form.Group>

      <Form.Group controlId="formFileCover" className="mb-3">
        <Form.Label>&nbsp;&nbsp;앨범 커버</Form.Label>
        <Form.Control type="file" onChange={onChangeCoverFile} />
      </Form.Group>

      <Form.Group controlId="formFileMusic" className="mb-3">
        <Form.Label>&nbsp;&nbsp;음원 파일</Form.Label>
        <Form.Control type="file" onChange={onChangeMusicFile} />
      </Form.Group>

      <ButtonWrapper>
        <Button variant="primary" type="submit" style={{ marginRight: '4px' }}>
          확인
        </Button>
        <Button
          variant="secondary"
          onClick={onClick}
          style={{ marginLeft: '4px' }}
        >
          취소
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default MusicPanelAddForm;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
