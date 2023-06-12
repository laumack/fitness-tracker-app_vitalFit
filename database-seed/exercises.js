"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const serviceAccount = require("./login.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const directoryPath = path.join(__dirname, "exercises");
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log("Error getting directory information.", err);
        return;
    }
    files === null || files === void 0 ? void 0 : files.forEach((file) => {
        let filePath = path.join(directoryPath, file);
        fs.readFile(filePath, "utf8", (err, jsonString) => {
            if (err) {
                console.log(`Error reading file ${file} from disk:`, err);
                return;
            }
            try {
                const data = JSON.parse(jsonString || "[]");
                data.forEach((item) => {
                    db.collection("exercises")
                        .doc(`${item.name}`)
                        .set(item)
                        .then((res) => {
                        console.log(`Document ${item.name} is successfully written!`);
                    })
                        .catch((error) => {
                        console.error(`Error writing document: ${error}`);
                    });
                });
            }
            catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });
    });
});
