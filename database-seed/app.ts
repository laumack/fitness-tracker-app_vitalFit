import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

const serviceAccount = require("./login.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const directoryPath = path.join(__dirname, "exercises");

fs.readdir(
  directoryPath,
  (err: NodeJS.ErrnoException | null, files?: string[]) => {
    if (err) {
      console.log("Error getting directory information.", err);
      return;
    }
    files?.forEach((file: string) => {
      let filePath = path.join(directoryPath, file);

      fs.readFile(
        filePath,
        "utf8",
        (err: NodeJS.ErrnoException | null, jsonString?: string) => {
          if (err) {
            console.log(`Error reading file ${file} from disk:`, err);
            return;
          }
          try {
            const data = JSON.parse(jsonString || "[]");
            data.forEach((item: any) => {
              db.collection("exercises")
                .doc(`${item.name}`)
                .set(item)
                .then((res: FirebaseFirestore.WriteResult) => {
                  console.log(`Document ${item.name} is successfully written!`);
                })
                .catch((error: any) => {
                  console.error(`Error writing document: ${error}`);
                });
            });
          } catch (err) {
            console.log("Error parsing JSON string:", err);
          }
        }
      );
    });
  }
);
