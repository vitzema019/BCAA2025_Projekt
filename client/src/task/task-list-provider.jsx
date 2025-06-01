import { createContext, useEffect, useState } from "react";
import FetchHelper from "../fetch-helper.js";

export const TaskListContext = createContext();

function TaskListProvider({ orderId: initialOrderId, children }) {
    const [orderId, setOrderId] = useState(initialOrderId);
    const [taskListDto, setTaskListDto] = useState({
        state: "ready", // ready | pending | error
        data: null,
        error: null,
    });

    async function handleLoad(dtoIn = {}) {
        const currentOrderId = dtoIn.orderId ?? orderId;

        setTaskListDto((prev) => ({ ...prev, state: "pending" }));

        const result = currentOrderId
            ? await FetchHelper.task.list({ orderId: currentOrderId })
            : await FetchHelper.task.list({}); // žádné orderId

        setTaskListDto((prev) => {
            if (result.ok) {
                return { ...prev, state: "ready", data: result.data, error: null };
            } else {
                return { ...prev, state: "error", error: result.data };
            }
        });
    }

    useEffect(() => {
        handleLoad({ orderId: initialOrderId });
    }, [initialOrderId]);

    async function handleCreate(dtoIn) {
        const currentOrderId = dtoIn.orderId ?? orderId;
        setTaskListDto((prev) => ({ ...prev, state: "pending" }));
        const result = await FetchHelper.task.create({ ...dtoIn, orderId: currentOrderId });

        setTaskListDto((prev) => {
            if (result.ok) {
                const updatedList = [...(prev.data?.itemList || []), result.data];
                return {
                    ...prev,
                    state: "ready",
                    data: { ...prev.data, itemList: updatedList },
                    error: null,
                };
            } else {
                return { ...prev, state: "error", error: result.data };
            }
        });

        return { ok: result.ok, error: result.ok ? undefined : result.data };
    }

    async function handleDelete(dtoIn) {
        setTaskListDto((prev) => ({ ...prev, state: "pending" }));
        const result = await FetchHelper.task.delete(dtoIn);

        setTaskListDto((prev) => {
            if (result.ok) {
                const updatedList = prev.data.itemList.filter((t) => t.id !== dtoIn.id);
                return {
                    ...prev,
                    state: "ready",
                    data: { ...prev.data, itemList: updatedList },
                    error: null,
                };
            } else {
                return { ...prev, state: "error", error: result.data };
            }
        });

        return { ok: result.ok, error: result.ok ? undefined : result.data };
    }

    const value = {
        ...taskListDto,
        handlerMap: { handleLoad, handleCreate, handleDelete },
    };

    return (
        <TaskListContext.Provider value={value}>
            {children}
        </TaskListContext.Provider>
    );
}

export default TaskListProvider;
