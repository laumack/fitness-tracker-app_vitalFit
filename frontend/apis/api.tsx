import axios from "axios";

const fitnessApi = axios.create({
  baseURL: "https://fitness-backend-p0d5.onrender.com/api",
});

export const fetchExercises = () => {
  return fitnessApi
    .get("/exercises")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const fetchMealPlan = (calorieRequirement) => {
  return fitnessApi
    .get(`/meal-plan/${calorieRequirement}`)
    .then((res) => {
      //console.log(res.data.meal.week);
      return res.data.meal.week;
    })
    .catch((err) => console.log(err));
};

export default fetchMealPlan;
