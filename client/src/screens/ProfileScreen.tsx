import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setSignOut, signout } from "../redux/slices/authSlice";
import { logout } from "../api/auth/auth.service";
import User from "../api/user/user.hooks";
import Auth from "../api/auth/auth.hooks";
import { showToast } from "../utils/index.utils";
import { useToast } from "react-native-toast-notifications";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [candidatePassword, setCandidatePassword] = useState("");
  const { userId } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const getUserData = User.useGetUserData(userId);
  const editUserData = User.useEditUserData(userId);
  const editUserPassword = User.useEditUserPassword(userId);
  const logout = Auth.useLogout();
  const toast = useToast();

  const handleGetUserData = () => {
    const { isSuccess, isLoading, data, isError, error } = getUserData;
    if (!isLoading) {
      if (isSuccess) {
        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
      }
    }
    if (isError) {
      showToast(toast, "danger", error as string);
    }
  };

  useMemo(() => {
    handleGetUserData();
  }, [getUserData.isLoading, getUserData.error, getUserData.data]);

  const handleEditUserInfo = () => {
    editUserData.mutate(
      { lastname, name },
      {
        onSuccess: () => {
          showToast(toast, "success", "User info updated");
        },
        onError: (error) => {
          showToast(toast, "danger", error as string);
        },
      }
    );
  };

  const handleEditUserPassword = () => {
    const { mutate, isError, error } = editUserPassword;
    mutate(
      { password, candidatePassword },
      {
        onSuccess: (data) => {
          showToast(toast, "success", "Password updated");
        },
        onError: (error) => {
          showToast(toast, "danger", error as string);
        },
      }
    );
  };

  function handleSignout() {
    logout.mutate(undefined, {
      onSuccess: () => {
        dispatch(setSignOut());
      },
      onError: (error) => {
        console.log(error);
        // showToast(toast, "danger", error as string);
      },
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 pt-5">
        <View className="items-center justify-center flex-1 px-6 pb-16 space-y-12 bg-white">
          <View className="w-full space-y-6">
            <View className="space-y-2">
              <Text className="self-start mb-2 text-2xl font-bold">
                User Information
              </Text>
              <View className="space-y-2">
                <Text className="font-semibold">Email</Text>
                <TextInput
                  className="w-full p-5 text-gray-400 rounded-2xl bg-gray-50"
                  editable={false}
                  selectTextOnFocus={false}
                  value={email}
                />
              </View>
              <Text className="font-semibold">Name</Text>
              <TextInput
                className="w-full p-5 rounded-2xl bg-gray-50"
                placeholder="Name"
                onChangeText={setName}
                value={name}
              />
            </View>
            <View className="space-y-2">
              <Text className="font-semibold">Last name</Text>
              <TextInput
                className="w-full p-5 rounded-2xl bg-gray-50"
                placeholder="Last name"
                onChangeText={setLastname}
                value={lastname}
              />
            </View>
            <TouchableOpacity
              className="items-center w-full p-5 bg-brand rounded-2xl"
              onPress={() => handleEditUserInfo()}
            >
              {editUserData.isLoading ? (
                <ActivityIndicator color="#fffff" />
              ) : (
                <Text className="font-semibold text-white">Update</Text>
              )}
            </TouchableOpacity>
          </View>
          <View className="w-full space-y-6">
            <View className="space-y-2">
              <Text className="self-start mb-2 text-2xl font-bold">
                Change Password
              </Text>
              <View className="space-y-2">
                <Text className="font-semibold">Current Password</Text>
                <TextInput
                  className="w-full p-5 rounded-2xl bg-gray-50 "
                  placeholder="Current Password"
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View className="space-y-2">
                <Text className="font-semibold">New Password</Text>
                <TextInput
                  className="w-full p-5 rounded-2xl bg-gray-50"
                  placeholder="New Password"
                  onChangeText={setCandidatePassword}
                  secureTextEntry
                />
              </View>
            </View>
            <TouchableOpacity
              className="items-center w-full p-5 bg-brand rounded-2xl"
              onPress={() => handleEditUserPassword()}
            >
              {editUserPassword.isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text className="font-semibold text-white">
                  Change Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleSignout()}>
            <Text className="font-semibold text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
