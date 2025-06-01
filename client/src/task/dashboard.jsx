import Container from "react-bootstrap/esm/Container";
import TaskListProvider from "./task-list-provider";
import TaskDashboardContent from "./dashboard-content";

function TaskDashboard() {
  return (
    <Container>
      <TaskListProvider>
        <TaskDashboardContent />
      </TaskListProvider>
    </Container>
  );
}

export default TaskDashboard;
