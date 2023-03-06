import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }), //As axios we use fetchBaseQuery, in development, is our localhost, change later when deployment
  tagTypes: ["Note", "User"], //Referring to catched data
  endpoints: (builder) => ({}), //Empty builder, we will provide extended slices, we start we empty builder
});
