import React, { useContext, useEffect, useReducer, useState } from "react";
import reducers from "./AuthenticationContex.reducers";
import initial from "./AuthenticationContext.initial";
import types from "./AuthenticationContex.types";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const authParameters = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body:
    "grant_type=client_credentials&client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET,
};

const AuthenticationContext = React.createContext();
export default AuthenticationContext;

export const useAuthenticationContext = () => useContext(AuthenticationContext);

export const AuthenticationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initial);

  useEffect(() => {
    async function fetchToken() {
      await fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((result) => result.json())
        .then((data) => {
          dispatch({
            type: types.ACCESS_TOKEN,
            payload: "Bearer " + data.access_token,
          });
          console.log("Got token");
        });
    }
    fetchToken();
  }, []);

  return (
    <AuthenticationContext.Provider value={state}>
      {children}
    </AuthenticationContext.Provider>
  );
};
