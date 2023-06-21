import axios, { AxiosResponse } from "axios";

const fitnessApi = axios.create({
  baseURL: "https://fitness-backend-p0d5.onrender.com/api",
});

export const fetchExercises = () => {
  return fitnessApi
    .get("/exercises")
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((err: Error) => console.log(err));
};

export const fetchMealPlan = (calorieRequirement: number) => {
  return fitnessApi
    .get(`/meal-plan/${calorieRequirement}`)
    .then((res: AxiosResponse) => {
      return res.data.meal.week;
    })
    .catch((err: Error) => console.log(err));
};

export const fetchRecipe = (id: number) => {
  return fitnessApi
    .get(`/recipe/${id}`)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((err: Error) => console.log(err));
};

export default fetchMealPlan;
