export type RootStackParamList = {
  ExerciseDetails: { id: string };
  HomeStack: undefined;
  AddExercise: undefined;
};

export type User = {
  id: string;
  email: string;
  name: string;
  lastname: string;
  createdAt: string;
  exercises: Exercise[];
};

export type Category = {
  id: string;
  name: string;
  image: string;
  exercises: Exercise[];
};

export type Exercise = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  users: Omit<User[], "createdAt" | "exercises">;
  categories: Omit<Category[], "exercises">;
};
