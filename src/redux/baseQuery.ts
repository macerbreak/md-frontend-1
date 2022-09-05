import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    // prepareHeaders: (headers) => {
    //     const token = storage.token;
    //
    //     if (token) {
    //         headers.set("authorization", `Bearer ${token}`);
    //     }
    //     return headers;
    // },
});

export default baseQuery;