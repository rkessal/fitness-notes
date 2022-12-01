import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signout } from "../redux/slices/authSlice";
import { logout } from "../api/auth/auth.service";
import User from "../api/user/user.hooks";

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

  useEffect(() => {
    const { isSuccess, isLoading, data, isError, error } = getUserData;
    if (!isLoading) {
      if (isSuccess) {
        setName(data.name);
        setLastname(data.lastname);
        setEmail(data.email);
      }
    }
    if (isError) {
      console.log(error);
    }
  }, []);

  const handleEditUserInfo = () => {
    const { mutate, isError, error } = editUserData;
    mutate({ lastname, name });
    if (isError) console.log(error);
  };

  const handleEditUserPassword = () => {
    const { mutate, isError, error } = editUserPassword;
    mutate(
      { password, candidatePassword },
      {
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error),
      }
    );
    console.log(editUserPassword);
    if (isError) console.log(error);
  };

  function handleSignout() {
    dispatch(signout());
    logout()
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 pt-5">
        <View className="flex-1 items-center justify-center px-6 bg-white space-y-12">
          <View className="w-full space-y-6">
            <View className="space-y-2">
              <Text className="self-start text-2xl font-bold mb-2">
                User Information
              </Text>
              <View className="space-y-2">
                <Text className="font-semibold">Email</Text>
                <TextInput
                  className="w-full rounded-2xl  p-5 bg-gray-50 text-gray-400"
                  editable={false}
                  selectTextOnFocus={false}
                  value={email}
                />
              </View>
              <Text className="font-semibold">Name</Text>
              <TextInput
                className="w-full rounded-2xl  p-5 bg-gray-50"
                placeholder="Name"
                onChangeText={setName}
                value={name}
              />
            </View>
            <View className="space-y-2">
              <Text className="font-semibold">Lastname</Text>
              <TextInput
                className="w-full rounded-2xl p-5 bg-gray-50"
                placeholder="LastName"
                onChangeText={setLastname}
                value={lastname}
              />
            </View>
            <TouchableOpacity
              className="p-5 bg-brand rounded-2xl w-full items-center"
              onPress={() => handleEditUserInfo()}
            >
              {editUserData.isLoading ? (
                <ActivityIndicator color="#fffff" />
              ) : (
                <Text className="text-white font-semibold">Update</Text>
              )}
            </TouchableOpacity>
          </View>
          <View className="w-full space-y-6">
            <View className="space-y-2">
              <Text className="self-start text-2xl font-bold mb-2">
                Change Password
              </Text>
              <View className="space-y-2">
                <Text className="font-semibold">Current Password</Text>
                <TextInput
                  className="w-full rounded-2xl  p-5 bg-gray-50 "
                  placeholder="Current Password"
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View className="space-y-2">
                <Text className="font-semibold">New Password</Text>
                <TextInput
                  className="w-full rounded-2xl  p-5 bg-gray-50"
                  placeholder="New Password"
                  onChangeText={setCandidatePassword}
                  secureTextEntry
                />
              </View>
            </View>
            <TouchableOpacity
              className="p-5 bg-brand rounded-2xl w-full items-center"
              onPress={() => handleEditUserPassword()}
            >
              {editUserPassword.isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text className="text-white font-semibold">
                  Change Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="p-5 bg-red-500 rounded-2xl w-full items-center"
            onPress={() => handleSignout()}
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
