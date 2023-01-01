export type RootStackParamList = {
  ExerciseDetails: {
    id: string;
    image: string;
    title: string;
    bodyPart: string;
    equipment: string;
    target: string;
  };
  HomeStack: undefined;
  Exercise: { id: string; title: string };
  AddExercise: undefined;
  AddCustomExercise: undefined;
  Timer: undefined;
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
  bodyPart: string;
  equipment: string;
  target: string;
  gifUrl?: string;
  users: Omit<User[], "createdAt" | "exercises">;
  sets: Set[];
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
