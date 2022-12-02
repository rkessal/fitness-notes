import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slices/authSlice";
import AppNavigator from "./app.navigator";
import AuthNavigator from "./auth.navigator";

type Props = {};

const AppRoute = (props: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppRoute;
