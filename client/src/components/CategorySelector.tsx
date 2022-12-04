import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Category, CategoryToExercise } from "../types/types";

type Props = {
  data: Category[] | undefined;
  handleSelection: ({ categoryId }: { categoryId: Category["id"] }) => void;
  isSelected: (id: Category["id"]) => CategoryToExercise | undefined;
};

const CategorySelector = ({ data, handleSelection, isSelected }: Props) => {
  return (
    <View className="space-y-2">
      {data?.map((category) => (
        <TouchableOpacity
          key={category.id}
          className={`w-full rounded-2xl  p-5  ${
            isSelected(category.id) ? "bg-brand " : "bg-gray-50"
          }`}
          onPress={() => handleSelection({ categoryId: category.id })}
        >
          <Text
            className={`font-semibold ${
              isSelected(category.id) ? "text-white" : "text-black"
            }`}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategorySelector;
