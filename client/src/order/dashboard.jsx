import Container from "react-bootstrap/esm/Container";
import OrderListProvider from "./order-list-provider";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  return (
    <Container>
      <OrderListProvider>
        <DashboardContent />
      </OrderListProvider>
    </Container>
  );
}

export default Dashboard;