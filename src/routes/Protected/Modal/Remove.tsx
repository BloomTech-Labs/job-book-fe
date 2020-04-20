import React, { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function Remove({ removeJob, id }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const removeAndClose = () => {
    removeJob(id);
    return handleClose();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Modal
        trigger={
          <Button
            color="red"
            onClick={handleOpen}
            style={{
              margin: "1em",
              position: "relative",
              bottom: "0",
              left: "0%"
            }}
          >
            Remove Job
          </Button>
        }
        open={modalOpen}
        onClose={handleClose}
        basic
        size="small"
      >
        <Header icon="trash" content="Remove Job Posting" />
        <Modal.Content>
          <h3>Are you sure you want to delete this Job posting?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={handleClose} inverted>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={removeAndClose} inverted>
            <Icon name="checkmark" /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Remove;