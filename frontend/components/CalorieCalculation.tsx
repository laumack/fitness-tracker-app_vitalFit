export enum Gender {
  Male = "male",
  Female = "female",
}

export enum ActivityLevel {
  LightlyActive = 1.375,
  ModeratelyActive = 1.55,
  VeryActive = 1.725,
}

export interface UserInfo {
  gender: Gender;
  weight: number;
  height: number;
  age: number;
  activityLevel: ActivityLevel;
}

export function calculateCalorieIntake(userInfo: UserInfo): number {
  const { gender, weight, height, age, activityLevel } = userInfo;

  const bmrConstant = gender === Gender.Male ? 88.362 : 447.593;
  const weightMultiplier = gender === Gender.Male ? 13.397 : 9.247;
  const heightMultiplier = gender === Gender.Male ? 4.799 : 3.098;
  const ageMultiplier = gender === Gender.Male ? 5.677 : 4.33;

  const bmr =
    bmrConstant +
    weightMultiplier * weight +
    heightMultiplier * height -
    ageMultiplier * age;

  const calorieIntake = bmr * activityLevel - 500;

  return calorieIntake;
}
