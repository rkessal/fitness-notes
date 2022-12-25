import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, signout } from "../redux/slices/authSlice";
import AppNavigator from "./app.navigator";
import AuthNavigator from "./auth.navigator";
import Auth from "../api/auth/auth.hooks";

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
