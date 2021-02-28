import React from "react";
import { Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList } from "../LoginNavigator";
import tailwind, { getColor } from "tailwind-rn";
import { Icon, Input, Button } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import * as firebase from "firebase";
import db from "../../../config/Firebase";
import { User, REGISTER, UserPayload, UserState } from "../../types/userTypes";

type SignupScreenNavigationProp = StackNavigationProp<
  LoginStackParamList,
  "Signup"
>;

type props = {
  navigation: SignupScreenNavigationProp;
};

const registerValidationSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  username: yup.string(),
  password: yup.string(),
  repeatPassword: yup.string(),
});

const Signup = ({ navigation }: props) => {
  const dispatch = useDispatch();

  const registerUser = async (user: UserPayload) => {
    const { email, username, password } = user;
    if (password) {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user?.uid) {
        // TODO Normalize variable names
        const user: UserState = {
          uid: response.user.uid,
          username,
          email,
          bio: '',
          likes: 0,
          photo: '',
          posts: []
        };
        await db.collection("users").doc(response.user.uid).set(user);
        dispatch({
          type: REGISTER,
          payload: user,
        });
      }
    } else {
      throw new Error("Password is missing");
    }
  };
  return (
    <View
      style={tailwind(
        "bg-blue-200 flex flex-1 flex-col justify-center flex-col items-center"
      )}
    >
      <View
        style={tailwind(
          "flex flex-col py-12 items-center bg-white rounded-md mx-4 border-l-4 border-blue-400 w-11/12"
        )}
      >
        <View style={tailwind("flex flex-row")}>
          <Text style={tailwind("text-2xl mb-4 text-4xl font-semibold")}>
            React Gram
          </Text>
          <Icon
            style={tailwind("ml-2")}
            name="logo-react"
            type="ionicon"
            size={42}
            color={getColor("blue-400")}
          />
        </View>

        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            passwordRepeat: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
            const { email, password, username } = values;
            setSubmitting(true);
            try {
              await registerUser({
                email,
                username,
                password,
              });
            } catch (e) {
              // TODO Set firebase errors
              setErrors({
                email: e.message,
                password: e.message,
                passwordRepeat: e.message,
                username: e.message,
              });
            } finally {
              setSubmitting(false);
              resetForm();
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={registerValidationSchema}
        >
          {({
            handleChange,
            handleBlur,
            values,
            handleSubmit,
            isSubmitting,
            errors,
            isValidating,
          }) => (
            <View style={tailwind("w-11/12")}>
              <Input
                placeholder="Email"
                leftIcon={{ type: "ionicons", name: "mail" }}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                value={values.email}
                errorMessage={errors.email}
              />
              <Input
                placeholder="Username"
                leftIcon={{ type: "feather", name: "user" }}
                onBlur={handleBlur("username")}
                onChangeText={handleChange("username")}
                value={values.username}
                errorMessage={errors.email}
              />
              <Input
                placeholder="Password"
                leftIcon={{ type: "fontawesome", name: "lock" }}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                errorMessage={errors.password}
              />
              <Input
                placeholder="Repeat your Password"
                leftIcon={{ type: "fontawesome", name: "lock" }}
                onBlur={handleBlur("passwordRepeat")}
                onChangeText={handleChange("passwordRepeat")}
                value={values.passwordRepeat}
                secureTextEntry={true}
                errorMessage={errors.password}
              />
              <Button
                title="Register"
                onPress={() => {
                  handleSubmit();
                }}
                loading={isSubmitting && isValidating}
                disabled={isSubmitting && isValidating}
              />
              <Text style={tailwind("my-2 font-medium text-center")}>
                Already have an account?
              </Text>
              <Button
                icon={<Icon name="arrow-right" size={15} color="white" />}
                title="Login Now"
                onPress={() => {
                  navigation.navigate("Login");
                }}
                type="outline"
                disabled={isSubmitting && isValidating}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Signup;
