import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Title from "../components/ui/Title";
import Category from "../api/category/category.hooks";
import Exercise from "../api/exercise/exercise.hooks";
import CategorySelector from "../components/CategorySelector";
import {
  Category as TCategory,
  CategoryToExercise,
  CustomExercisePayload,
} from "../types/types";
import { showToast } from "../utils/index.utils";
import { useToast } from "react-native-toast-notifications";

type Props = {};

const AddCustomExerciseScreen = (props: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const { data } = Category.useGetCategories();
  const { mutate } = Exercise.useCreateCustomExercise();
  const [selectedItems, setSelectedItems] = useState<CategoryToExercise[]>([]);
  const toast = useToast();

  const isSelected = (id: TCategory["id"]) => {
    return selectedItems.find((item) => item.categoryId === id);
  };

  const handleSelection = ({ categoryId }: { categoryId: TCategory["id"] }) => {
    const isAlreadySelected = isSelected(categoryId);
    if (!isAlreadySelected) {
      setSelectedItems((prev) => {
        return [
          ...prev,
          {
            categoryId: categoryId,
          },
        ];
      });
    } else {
      setSelectedItems((prev) => {
        return prev.filter((item) => item.categoryId !== categoryId);
      });
    }
  };

  const handleAddCustomExercise = () => {
    mutate(
      { name: name, description: description, categories: selectedItems },
      {
        onSuccess: () => {
          showToast(toast, "success", "Exercise added");
        },
        onError: (error) => {
          console.log(error);
          showToast(toast, "danger", error as string);
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-1 p-6 space-y-10">
        <View className="mt-4 items-center">
          <Title intent="header">Your custom exercise</Title>
        </View>
        <View className="space-y-6">
          <View className="space-y-2">
            <Text className="font-semibold">Name</Text>
            <TextInput
              className="w-full rounded-2xl  p-5 bg-gray-50"
              placeholder="Name"
              onChangeText={setName}
            />
          </View>

          <View className="space-y-2">
            <Text className="font-semibold">Description</Text>
            <TextInput
              className="w-full rounded-2xl  p-5 bg-gray-50"
              placeholder="Description"
              numberOfLines={8}
              onChangeText={setDescription}
            />
          </View>

          <View className="space-y-2">
            <Text className="font-semibold">Categories</Text>
            <View>
              <CategorySelector
                data={data}
                handleSelection={handleSelection}
                isSelected={isSelected}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="p-5 bg-brand rounded-2xl w-full items-center"
          onPress={() => handleAddCustomExercise()}
        >
          <Text className="text-white font-semibold">Add custom exercise</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCustomExerciseScreen;
