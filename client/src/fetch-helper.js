async function Call(baseUri, useCase, dtoIn, method) {
    // return fetch
    let response;
    if (!method || method === "get") {
        response = await fetch(
            `${baseUri}/${useCase}${dtoIn && Object.keys(dtoIn).length
                ? `?${new URLSearchParams(dtoIn)}`
                : ""
            }`
        );
    } else {
        response = await fetch(`${baseUri}/${useCase}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
    }
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
}

const baseUri = "/api";

const FetchHelper = {
    order: {
        get: async (dtoIn) => {
            return await Call(baseUri, "order/get", dtoIn, "get");
        },
        create: async (dtoIn) => {
            return await Call(baseUri, "order/create", dtoIn, "post");
        },
        update: async (dtoIn) => {
            return await Call(baseUri, "order/update", dtoIn, "post");
        },
        delete: async (dtoIn) => {
            return await Call(baseUri, "order/delete", dtoIn, "post");
        },
        list: async (dtoIn) => {
            return await Call(baseUri, "order/list", dtoIn, "get");
        },
    },

    task: {
        get: async (dtoIn) => {
            return await Call(baseUri, "task/get", dtoIn, "get");
        },
        create: async (dtoIn) => {
            return await Call(baseUri, "task/create", dtoIn, "post");
        },
        update: async (dtoIn) => {
            return await Call(baseUri, "task/update", dtoIn, "post");
        },
        delete: async (dtoIn) => {
            return await Call(baseUri, "task/delete", dtoIn, "post");
        },
        list: async (dtoIn) => {
            return await Call(baseUri, "task/list", dtoIn, "get");
        }
    },
};

export default FetchHelper;