import axiosClient, { throwErrorMessage } from "../client";

export async function getCategories() {
  try {
    const { data } = await axiosClient.get("/category");
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
