import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface AboutInterface {
  show: boolean;
  handleClose: () => void;
}

const AboutModal: React.FC<AboutInterface> = ({ show, handleClose }) => {
  const [showAbout, setShowAbout] = useState(show);

  const handleShowAbout = () => setShowAbout(true);

  useEffect(() => {
    setShowAbout(show);
  });

  return (
    <div>
      <Modal className="modal" show={showAbout} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>ABOUT</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AboutModal;
