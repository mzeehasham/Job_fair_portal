import { AppContextInitialState } from "../../Types";

export const initialState: AppContextInitialState = {
  token: "",
};

export function AppReducer(
  state: AppContextInitialState,
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "DELETE_TOKEN":
      return initialState;
    default:
      return state;
  }
}
