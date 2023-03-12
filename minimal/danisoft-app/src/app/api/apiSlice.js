import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://danisoft.onrender.com",
  credentials: "include", //This way we'll always send our cookie
  prepareHeaders: (headers, { getState }) => {
    // Available to the fetchBaseQuery, pass the headers and destructure the api getState
    const token = getState().auth.token;

    if (token) {
      // If we have the token in the state, we set the headers bellow with the specific formt expected
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers; // return the headers
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  //This is a separate api from prepare headers api
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions); //Result from the first request. It may succedd without the code bellow if the access token hasn't expire

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      //The refresh token shoukd give us a new access token with setCredentials

      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth, //As axios we use fetchBaseQuery, in development, is our localhost, change later when deployment
  tagTypes: ["Note", "User"], //Referring to catched data
  endpoints: (builder) => ({}), //Empty builder, we will provide extended slices, we start we empty builder
});
