import axios from "axios";
import { BASE_URL } from "../../utils/index.utils";
export async function getExercises() {
  try {
    const response = await axios.get(`${BASE_URL}/exercise`);
    return response;
  } catch (error: any) {
    console.log(error.response);
  }
}
