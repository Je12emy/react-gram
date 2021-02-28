import React from "react";
import SwitchNavigator from "./src/navigation/LoginNavigator";
import thunkMiddleware from "redux-thunk";
import reducers from "./src/reducers/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { ThemeProvider } from "react-native-elements";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducers, middleware);

import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <SwitchNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
