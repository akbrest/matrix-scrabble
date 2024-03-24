import { useState } from "react";
import { Modal } from "react-bootstrap";

interface StatisticsInterface {
  show: boolean;
  handleClose: () => void;
}

const StatisticsModal: React.FC<StatisticsInterface> = ({
  show,
  handleClose,
}) => {
  return (
    <div>
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>STATISTICS</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default StatisticsModal;
