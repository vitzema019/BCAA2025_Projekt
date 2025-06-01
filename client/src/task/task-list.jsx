import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

import { TaskListContext } from "./task-list-provider.jsx";
import TaskDeleteDialog from "./task-delete-dialog.jsx";
import TaskForm from "./task-item-form.jsx";

function TaskList() {
    const { state, data, error, handlerMap } = useContext(TaskListContext);
    const [showForm, setShowForm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    console.log(data);
    if (state === "pending") return <div>Načítání úkolů...</div>;
    if (state === "error")
        return <Alert variant="danger">Chyba: {error?.message || "Neznámá chyba"}</Alert>;
    if (!data?.itemList?.length)
        return (
            <>
                <p>Žádné úkoly k této zakázce.</p>
                <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
                    Přidat úkol
                </Button>
                {showForm && <TaskForm onClose={() => setShowForm(false)} />}
            </>
        );

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <span>Úkoly</span>
                    <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
                        Přidat úkol
                    </Button>
                </Card.Header>
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

            {showForm && <TaskForm onClose={() => setShowForm(false)} />}

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

export default TaskList;
