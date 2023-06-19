import axios from "axios";

const fitnessApi = axios.create({
  baseURL: "https://fitness-backend-p0d5.onrender.com",
});

export const fetchExercises = () => {
  return fitnessApi
    .get("/api/exercises")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export default fetchExercises;
