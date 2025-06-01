import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

import { TaskListContext } from "./task-list-provider.jsx";
import TaskDeleteDialog from "./task-delete-dialog.jsx";

function TaskListReadOnly() {
    const { state, data, error, handlerMap } = useContext(TaskListContext);
    const [taskToDelete, setTaskToDelete] = useState(null);

    if (state === "pending") return <div>Načítání úkolů...</div>;
    if (state === "error")
        return <Alert variant="danger">Chyba: {error?.message || "Neznámá chyba"}</Alert>;
    if (!data?.itemList?.length)
        return (
            <Card>
                <Card.Header>{data?.order?.name ?? "Zakázka"}</Card.Header>
                <Card.Body><p>Žádné úkoly k této zakázce.</p></Card.Body>
            </Card>
        );

    return (
        <>
            <Card>
                <Card.Header>{data?.order?.name ?? "Zakázka"}</Card.Header>
                <ListGroup variant="flush">
                    {data.itemList.map((task) => (
                        <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-start">
                            <div>
                                <div><strong>{task.name}</strong></div>
                                <div className="text-muted">{task.description || "Bez popisu"}</div>
                                <div className="small">Do: {task.deadline}</div>
                            </div>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => setTaskToDelete(task)}
                            >
                                Smazat
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            {taskToDelete && (
                <TaskDeleteDialog
                    task={taskToDelete}
                    onClose={() => setTaskToDelete(null)}
                    onConfirm={() => {
                        handlerMap.handleDelete({ id: taskToDelete.id });
                        setTaskToDelete(null);
                    }}
                />
            )}
        </>
    );
}

export default TaskListReadOnly;
