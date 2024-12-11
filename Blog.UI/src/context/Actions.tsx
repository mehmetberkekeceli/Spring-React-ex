interface UserCredentials {
  username: string;
  password: string;
}

export interface Action {
  type: string;
  payload?: any;
}

export const LoginStart = (userCredentials: UserCredentials): Action => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: any): Action => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (): Action => ({
  type: "LOGIN_FAILURE",
});

export const Logout = (): Action => ({
  type: "LOGOUT",
});

export const UpdateStart = (userCredentials: UserCredentials): Action => ({
  type: "UPDATE_START",
});

export const UpdateSuccess = (user: any): Action => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFailure = (): Action => ({
  type: "UPDATE_FAILURE",
});
