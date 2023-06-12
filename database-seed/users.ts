import * as admin from "firebase-admin";
import * as bcrypt from "bcrypt";

const serviceAccount = require("./login.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

interface User {
  id: string;
  username: string;
  password: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: number;
  eatingPreferences?: string[];
}

const saltRounds = 10;

async function addUser(user: User) {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;

  return db
    .collection("users")
    .doc(user.id)
    .set(user)
    .then(() => {
      console.log(`User ${user.id} is successfully added!`);
    })
    .catch((err) => {
      console.log(`Error adding user: ${err}`);
    });
}

const userId = Date.now().toString() + Math.floor(Math.random() * 1000000000);

const user: User = {
  id: userId,
  username: "Admin",
  password: "changeme",
  age: 25,
  gender: "m",
  height: 180,
  weight: 95,
  goal: 82.5,
  eatingPreferences: ["Vegetarian", "Vegan", "Gluten-Free", "Nut-Free"],
};

addUser(user);