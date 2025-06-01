import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { TaskListContext } from "./task-list-provider";

function TaskDeleteDialog({ task, onClose }) {
  const { handlerMap, state } = useContext(TaskListContext);

  async function handleDelete() {
    await handlerMap.handleDelete({ id: task.id });
    onClose();
  }

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Potvrzení smazání</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Opravdu chceš smazat úkol <strong>{task?.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={state === "pending"}
        >
          Zrušit
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={state === "pending"}
        >
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskDeleteDialog;
