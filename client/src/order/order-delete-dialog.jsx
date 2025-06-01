import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { OrderListContext } from "./order-list-provider";

function OrderDeleteDialog({ order, onClose }) {
  const { state, handlerMap } = useContext(OrderListContext);
  const [errorState, setErrorState] = useState();

  if (!order) return null;

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Smazat zakázku</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!errorState?.message && (
          <Alert variant="danger">{errorState.message}</Alert>
        )}
        {`Opravdu chceš smazat zakázku ${order.name || order.id}?`}
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
          disabled={state === "pending"}
          onClick={async () => {
            const result = await handlerMap.handleDelete({ id: order.id });
            if (result.ok) {
              onClose();
            } else {
              setErrorState(result.error || { message: "Nepodařilo se smazat zakázku." });
            }
          }}
        >
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderDeleteDialog;
