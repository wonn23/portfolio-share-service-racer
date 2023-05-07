/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modals({ show, setModalShow, setIsConfirmed }) {
  const handleClose = () => setModalShow(false);

  const handleEdit = () => {
    setIsConfirmed(true);
    setModalShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>학력</Modal.Title>
      </Modal.Header>
      <Modal.Body>수정하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          수정
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;
