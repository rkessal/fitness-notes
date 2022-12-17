export type RootStackParamList = {
  ExerciseDetails: { id: string };
  HomeStack: undefined;
  Exercise: { id: string };
  AddExercise: undefined;
  AddCustomExercise: undefined;
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

export type Set = {
  id: string;
  weight: number;
  reps: number;
  createdAt: string;
  exerciseId: Exercise["id"];
  userId: User["id"] | undefined;
  Exercise: Exercise;
};

export type CategoryToExercise = {
  categoryId: Category["id"];
};

export type CustomExercisePayload = {
  name: string;
  description: string;
  image?: string;
  categories: CategoryToExercise[];
};
