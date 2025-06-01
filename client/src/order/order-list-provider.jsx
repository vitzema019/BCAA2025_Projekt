import { createContext, useState, useEffect } from "react";
import FetchHelper from "../fetch-helper.js";

export const OrderListContext = createContext();

function OrderListProvider({ children }) {
  const [orderListDto, setOrderListDto] = useState({
    state: "ready", // one of ready/pending/error
    data: null,
    error: null,
  });

  // Volitelně můžeš přidat např. selectedDate nebo jiné filtry, pokud budeš potřebovat

  async function handleLoad() {
    setOrderListDto((current) => ({
      ...current,
      data: undefined,
      state: "pending",
    }));

    const result = await FetchHelper.order.list({});

    setOrderListDto((current) => {
      if (result.ok) {
        return {
          ...current,
          state: "ready",
          data: result.data,
          error: null,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
        };
      }
    });
  }

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleCreate(dtoIn) {
    setOrderListDto((current) => ({
      ...current,
      state: "pending",
    }));

    const result = await FetchHelper.order.create(dtoIn);

    setOrderListDto((current) => {
      if (result.ok) {
        current.data.itemList.push(result.data);
        return {
          ...current,
          state: "ready",
          data: {
            ...current.data,
            itemList: current.data.itemList.slice(),
          },
          error: null,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
        };
      }
    });

    return {
      ok: result.ok,
      error: result.ok ? undefined : result.data,
    };
  }

  async function handleUpdate(dtoIn) {
    setOrderListDto((current) => ({
      ...current,
      state: "pending",
      pendingId: dtoIn.id,
    }));

    const result = await FetchHelper.order.update(dtoIn);

    setOrderListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList[itemIndex] = dtoIn;
        return {
          ...current,
          state: "ready",
          data: {
            ...current.data,
            itemList: current.data.itemList.slice(),
          },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });

    return {
      ok: result.ok,
      error: result.ok ? undefined : result.data,
    };
  }

  async function handleDelete(dtoIn) {
    setOrderListDto((current) => ({
      ...current,
      state: "pending",
      pendingId: dtoIn.id,
    }));

    const result = await FetchHelper.order.delete(dtoIn);

    setOrderListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: {
            ...current.data,
            itemList: current.data.itemList.slice(),
          },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });

    return {
      ok: result.ok,
      error: result.ok ? undefined : result.data,
    };
  }

  const value = {
    ...orderListDto, // state, data, error, pendingId (volitelný)
    handlerMap: {
      handleLoad,
      handleCreate,
      handleUpdate,
      handleDelete,
    },
  };

  return (
    <OrderListContext.Provider value={value}>
      {children}
    </OrderListContext.Provider>
  );
}

export default OrderListProvider;
