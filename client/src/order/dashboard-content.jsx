import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import OrderItemForm from "./order-item-form";
import OrderDeleteDialog from "./order-delete-dialog";
import { OrderListContext } from "./order-list-provider";
import PendingItem from "./pending-item";
import OrderList from "./order-list";

function DashboardContent() {
  const { state, data } = useContext(OrderListContext);
  const [orderFormData, setOrderFormData] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);

  return (
    <Card className="border-0">
      {!!orderFormData && (
        <OrderItemForm
          item={orderFormData}
          onClose={() => setOrderFormData(null)}
        />
      )}

      {!!orderToDelete && (
        <OrderDeleteDialog
          order={orderToDelete}
          onClose={() => setOrderToDelete(null)}
        />
      )}

      <Card.Header
        className="sticky-top d-flex justify-content-between align-items-center"
        bsPrefix="bg-white"
        style={{ top: "56px", padding: "8px" }}
      >
        <span className="fw-bold">Seznam zakázek</span>
        <Button variant="primary" onClick={() => setOrderFormData({})}>
          + Nová zakázka
        </Button>
      </Card.Header>

      <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
        {state === "pending" && !data &&
          [0, 1, 2, 3].map((item) => <PendingItem key={item} />)}

        {state === "ready" && data?.itemList?.length === 0 ? (
          <div className="text-center text-muted py-5">
            Žádné zakázky k zobrazení
          </div>
        ) : (
          <OrderList
            setOrderToDelete={setOrderToDelete}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default DashboardContent;
