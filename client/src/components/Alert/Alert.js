import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import constants from '../../containers/AuthContainer/Store/AuthContainerConstants';

const ProductAlert = ({ closeModal, modalOpen, title, errorMessage }) => {
  return (
    <Modal show={modalOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    modalOpen: state.authReducer.modalOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: constants.CLOSE_MODAL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAlert);
