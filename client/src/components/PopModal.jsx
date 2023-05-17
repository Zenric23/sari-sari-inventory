import React from "react";
import Modal from "react-bootstrap/Modal";

const PopModal = ({ title, show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
};

export default PopModal;
 