import { LOGIN, User, CreateUserAction } from "../types/userTypes";
import * as firebase from "firebase";
import db from "../../config/Firebase";
import { Dispatch } from "redux";

export const registerUser = (user: User) => async (dispatch: Dispatch<CreateUserAction>) => {
  const { email, username, password } = user;
  try {
    if (password) {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user?.uid) {
        const user: User = {
          username,
          email,
        };
        db.collection("users").doc(response.user.uid).set(user);
        dispatch({
          type: LOGIN,
          payload: user,
        });
      }
    } else {
      throw new Error("Password is missing");
    }
  } catch (e) {}
};
