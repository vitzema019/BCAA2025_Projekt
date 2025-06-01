import TaskListProvider from "./task-list-provider";
import TaskList from "./task-list";

function OrderTaskList({ orderId }) {
  return (
    <TaskListProvider orderId={orderId}>
      <TaskList />
    </TaskListProvider>
  );
}

export default OrderTaskList;