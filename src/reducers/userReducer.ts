import {REGISTER, UserState, CreateUserAction, LOGIN} from "../types/userTypes"

const initialState:UserState = {
  uid: '',
  username: '',
  email: '',
  posts: [],
  bio: '',
  likes: 0,
  photo: ''
}

export const userReducer = ( state = initialState, action: CreateUserAction) => {
  switch (action.type) {
    case REGISTER:
      return {...state, username: action.payload.username, email: action.payload.email }
    case LOGIN:
      console.log("Login")
      break;
    default:
      return {...state};
  }
};
