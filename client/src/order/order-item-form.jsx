import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { OrderListContext } from "./order-list-provider";

function OrderItemForm({ show = true, onClose, item }) {
  const { state, error, handlerMap } = useContext(OrderListContext);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    let result;
    if (item?.id) {
      result = await handlerMap.handleUpdate({ id: item.id, ...values });
    } else {
      result = await handlerMap.handleCreate(values);
    }

    if (result.ok) {
      onClose();
    } else {
      setLocalError(result.error || { message: "Nepodařilo se uložit zakázku." });
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{item?.id ? "Upravit zakázku" : "Nová zakázka"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" && error?.message && (
            <Alert variant="danger">{error.message}</Alert>
          )}
          {localError?.message && (
            <Alert variant="danger">{localError.message}</Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
              name="name"
              type="text"
              defaultValue={item?.name}
              required
              maxLength={100}
              disabled={state === "pending"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Popis</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              defaultValue={item?.description}
              maxLength={250}
              disabled={state === "pending"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              name="dateOfCreation"
              type="date"
              defaultValue={
                item?.dateOfCreation
                  ? new Date(item.dateOfCreation).toISOString().slice(0, 10)
                  : new Date().toISOString().slice(0, 10)
              }
              required
              max={new Date().toISOString().slice(0, 10)}
              disabled={state === "pending"}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={state === "pending"}>
            Zavřít
          </Button>
          <Button variant="primary" type="submit" disabled={state === "pending"}>
            {item?.id ? "Uložit změny" : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default OrderItemForm;
