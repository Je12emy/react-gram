export const LOGIN = "USER_LOGIN"
export const REGISTER = "USER_REGISTER"

export interface CreateUserAction {
    type: typeof REGISTER | typeof LOGIN;
    payload: UserPayload
}

export interface UserPayload {
  username: string,
  email: string,
  password: string,
}

export interface User {
  uid: string;
  username: string;
  email: string;
  password?: string;
}

export interface UserState {
  uid: string;
  username: string;
  email: string;
  posts: [];
  bio: string;
  likes: number;
  photo: string;
}
