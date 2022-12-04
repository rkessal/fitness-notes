import { useQuery, UseQueryResult } from "react-query";
import { Category } from "../../types/types";
import { getCategories } from "./category.service";

export default {
  useGetCategories: (): UseQueryResult<Category[]> =>
    useQuery("getCategories", () => getCategories()),
};
