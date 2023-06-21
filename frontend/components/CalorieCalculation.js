function calculateCalorieIntake(userData) {
  const { gender, weight, height, age, activityLevel } = userData;

  function getActivityLevel(activity) {
    switch (activity) {
      case "Low":
        return 1.375;
      case "Moderate":
        return 1.55;
      case "Intense":
        return 1.725;
      default:
        return 1.375;
    }
  }

  const bmrConstant = gender == "male" ? 88.362 : 447.593;
  const weightMultiplier = gender == "male" ? 13.397 : 9.247;
  const heightMultiplier = gender == "male" ? 4.799 : 3.098;
  const ageMultiplier = gender == "male" ? 5.677 : 4.33;

  const bmr =
    bmrConstant +
    weightMultiplier * weight +
    heightMultiplier * height -
    ageMultiplier * age;

  const calorieIntake = Math.round(bmr * getActivityLevel(activityLevel) - 500);
  console.log('calorieIntake: ', calorieIntake);

  return calorieIntake;
}

export default calculateCalorieIntake;
