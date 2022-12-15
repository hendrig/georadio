import types from "./AuthenticationContex.types";

export default (state, { type, payload }) => {
  switch (type) {
    case types.ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };
    default:
      return state;
  }
};
