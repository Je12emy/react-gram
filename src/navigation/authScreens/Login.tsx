import React from "react";
import { Text, View } from "react-native";
import tailwind, { getColor } from "tailwind-rn";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList } from "../LoginNavigator";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";

type LoginScreenNavigationProp = StackNavigationProp<
  LoginStackParamList,
  "Login"
>;

type props = {
  navigation: LoginScreenNavigationProp;
};
const loginValidationSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string()
});

const Login = ({ navigation }: props) => {
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
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.resetForm();
            actions.setSubmitting(true);
          }}
          validationSchema={loginValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({
            handleChange,
            handleBlur,
            values,
            handleSubmit,
            isSubmitting,
          }) => (
            <View style={tailwind("w-11/12")}>
              <Input
                placeholder="Email"
                leftIcon={{ type: "ionicons", name: "mail" }}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                value={values.email}
              />
              <Input
                placeholder="Password"
                leftIcon={{ type: "fontawesome", name: "lock" }}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
              />
              <Button
                title="Login"
                onPress={() => {
                  handleSubmit();
                }}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
              <Text style={tailwind("my-2 font-medium text-center")}>
                Don't have and account?
              </Text>
              <Button
                icon={<Icon name="arrow-right" size={15} color="white" />}
                title="Signup Now"
                onPress={() => {
                  navigation.navigate("Signup");
                }}
                type="outline"
                disabled={isSubmitting}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
