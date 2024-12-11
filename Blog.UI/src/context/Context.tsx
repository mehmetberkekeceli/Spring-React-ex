import {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  useState,
} from "react";
import Reducer from "./Reducer";

interface IState {
  user: any;
  isFetching: boolean;
  error: boolean;
  token: string | null;
}

interface IContextProps {
  children: ReactNode;
}

interface IContext extends IState {
  dispatch: React.Dispatch<any>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const userFromLocalStorage = localStorage.getItem("user");
const INITIAL_STATE: IState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
  isFetching: false,
  error: false,
  token: null,
};

export const Context = createContext<IContext>({
  ...INITIAL_STATE,
  dispatch: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }: IContextProps) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    if (token !== null) {
      localStorage.setItem("token", token);
    }
  }, [state.user, token]);
  return (
    <Context.Provider value={{ ...state, token, dispatch, setToken }}>
      {children}
    </Context.Provider>
  );
};
