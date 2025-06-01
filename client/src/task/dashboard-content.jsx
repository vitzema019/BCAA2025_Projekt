import { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { TaskListContext } from "./task-list-provider";
import TaskForm from "./task-item-form";
import TaskDeleteDialog from "./task-delete-dialog";
import PendingItem from "../order/pending-item";
import TaskList from "./task-list-readonly";

function TaskDashboardContent() {
    const { state, data, handlerMap } = useContext(TaskListContext);
    const [taskFormData, setTaskFormData] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Načti všechny tasky bez ohledu na orderId
    useEffect(() => {
        handlerMap.handleLoad({});
    }, []);

    return (
        <Card className="border-0">
            {!!taskFormData && (
                <TaskForm task={taskFormData} onClose={() => setTaskFormData(null)} />
            )}

            {!!taskToDelete && (
                <TaskDeleteDialog
                    task={taskToDelete}
                    onClose={() => setTaskToDelete(null)}
                />
            )}

            <Card.Header
                className="sticky-top d-flex justify-content-between align-items-center"
                bsPrefix="bg-white"
                style={{ top: "56px", padding: "8px" }}
            >
                <span className="fw-bold">Všechny úkoly</span>
            </Card.Header>

            <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
                {state === "pending" && !data &&
                    [0, 1, 2, 3].map((item) => <PendingItem key={item} />)}

                {state === "ready" && data?.itemList?.length === 0 ? (
                    <div className="text-center text-muted py-5">
                        Žádné úkoly k zobrazení
                    </div>
                ) : (
                    <TaskList
                    />
                )}
            </Card.Body>
        </Card>
    );
}

export default TaskDashboardContent;
