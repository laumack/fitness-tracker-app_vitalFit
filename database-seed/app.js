const admin = require("firebase-admin");
const fs = require('fs');

const serviceAccount = require("./login.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

fs.readFile("./data.json", 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        const data = JSON.parse(jsonString);

        data.forEach((item, index) => {
            console.log(item.id);
            db.collection('meals').doc(`${item.id}`).set(item)
                .then((res) => {
                    console.log(`Document ${item.id} is successfully written!`);
                })
                .catch((error) => {
                    console.error(`Error writing document: ${error}`);
                });
        });
    } catch (err) {
        console.log('Error parsing JSON string:', err);
    }
});