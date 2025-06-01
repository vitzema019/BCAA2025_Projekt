import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { TaskListContext } from "./task-list-provider";

function TaskForm({ task, orderId, onClose }) {
  const { state, error, handlerMap } = useContext(TaskListContext);

  return (
    <Modal show={true} onHide={onClose} centered>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);

          values.orderId = orderId;

          let result;
          if (task?.id) {
            result = await handlerMap.handleUpdate({ id: task.id, ...values });
          } else {
            result = await handlerMap.handleCreate({ ...values });
          }

          if (result.ok) {
            onClose();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{task?.id ? "Upravit" : "Přidat"} úkol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" && <Alert variant="danger">{error.message}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
              name="name"
              type="text"
              defaultValue={task?.name}
              maxLength={100}
              required
              disabled={state === "pending"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Popis</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              defaultValue={task?.description}
              maxLength={250}
              disabled={state === "pending"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Termín (deadline)</Form.Label>
            <Form.Control
              name="deadline"
              type="date"
              defaultValue={
                task?.deadline
                  ? new Date(task.deadline).toISOString().slice(0, 10)
                  : new Date().toISOString().slice(0, 10)
              }
              required
              disabled={state === "pending"}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={state === "pending"}
          >
            Zrušit
          </Button>
          <Button type="submit" variant="primary" disabled={state === "pending"}>
            Uložit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskForm;
