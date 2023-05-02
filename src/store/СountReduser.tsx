import { createContext, useReducer } from "react";
import CountService from "../service/CountService";

export enum ActionTypes {
  IncreaseCount = "IncreaseCount",
  CountFromServer = "CountFromServer",
  ResultFromServer = "ReslutFromServer",
  ErrorFetch = "ErrorFetch"
}

export enum IsLoading {
  Idle = "idle",
  Pending = "pending",
}

export interface IState {
  count: number;
  serverCount: number;
  isLoading: IsLoading;
  error: string
}

type ActionCount = {
  type: ActionTypes.IncreaseCount;
  payload: number;
};

type ActionStartLoading = {
  type: ActionTypes.CountFromServer;
  payload?: undefined
};

type ActionResolve = {
  type: ActionTypes.ResultFromServer;
  payload: number
};

type ActionErrorFetch = {
  type: ActionTypes.ErrorFetch;
  payload: string
};

type ActionCombined = ActionCount | ActionStartLoading | ActionResolve | ActionErrorFetch

export const CountContext = createContext(
  {} as { state: IState; dispatch: React.Dispatch<ActionCombined> }
);

export const ChatContext = createContext({} as { state: IState, dispatch: React.Dispatch<ActionCombined> });

export const CountContextProvider = ({ children }: { children: string | JSX.Element | JSX.Element[] }) => {
  const INITIAL_STATE: IState = {
    count: 0,
    serverCount: 0,
    isLoading: IsLoading.Idle,
    error: ""
  };

  const countReduser = (state: IState, action: ActionCombined) => {
    switch (action.type) {
      case ActionTypes.IncreaseCount:

        if (state.isLoading === IsLoading.Pending) {
          return state
        }

        return {
          ...state,
          count: state.count + action.payload,
        };

      case ActionTypes.CountFromServer:

        if (state.isLoading === IsLoading.Pending) {
          return state
        }

        CountService.CountsFromServer("https://lk.zont-online.ru/api/button_count", { count: state.count })
          .then((response) => {
            dispatch({ type: ActionTypes.ResultFromServer, payload: response.count })
          }).catch((err: Error) => {
            dispatch({ type: ActionTypes.ErrorFetch, payload: err.message ?? "Something went wrong" })
          })

        return {
          ...state,
          isLoading: IsLoading.Pending
        };

      case ActionTypes.ResultFromServer:

        return {
          ...state,
          serverCount: action.payload,
          isLoading: IsLoading.Idle
        };

      case ActionTypes.ErrorFetch:

        console.log(action.payload)

        return {
          ...state,
          isLoading: IsLoading.Idle,
          error: action.payload
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(countReduser, INITIAL_STATE);

  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
};
