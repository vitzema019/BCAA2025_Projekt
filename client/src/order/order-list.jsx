import { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import OrderTaskList from "../task/order-task-list";
import OrderDeleteDialog from "./order-delete-dialog";
import { OrderListContext } from "./order-list-provider";

function OrderList() {
  const { state, error, data, pendingId, handlerMap } = useContext(OrderListContext);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleDeleteSuccess = () => {
    setOrderToDelete(null);
    handlerMap.handleLoad(); // přenačíst zakázky
  };

  if (state === "pending" && !data) {
    return (
      <div className="text-center py-3">
        <Spinner animation="border" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <Alert variant="danger" className="mx-3">
        Chyba při načítání zakázek: {error?.message || "Neznámá chyba"}
      </Alert>
    );
  }

  if (!data?.itemList?.length) {
    return (
      <Alert variant="info" className="mx-3">
        Nebyla nalezena žádná zakázka.
      </Alert>
    );
  }

  return (
    <>
      <Accordion className="px-3">
        {data.itemList.map((order, index) => (
          <Accordion.Item eventKey={index.toString()} key={order.id}>
            <Accordion.Header>
              {order.name || "Bez názvu"} ({order.dateOfCreation})
            </Accordion.Header>
            <Accordion.Body>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Text>
                    <strong>ID:</strong> {order.id}
                    <br />
                    <strong>Popis:</strong>{" "}
                    {order.description || "žádný popis"}
                  </Card.Text>
                  <div className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setOrderToDelete(order)}
                      disabled={pendingId === order.id}
                    >
                      {pendingId === order.id ? (
                        <>
                          <Spinner animation="border" size="sm" /> Mazání…
                        </>
                      ) : (
                        "Smazat zakázku"
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              <OrderTaskList orderId={order.id} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <OrderDeleteDialog
        order={orderToDelete}
        onConfirm={handleDeleteSuccess}
        onClose={() => setOrderToDelete(null)}
      />
    </>
  );
}

export default OrderList;
