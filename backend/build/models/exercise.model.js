"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExercisesByCategory = exports.fetchExercises = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
const fetchExercises = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield connection_1.default.collection("exercises").get();
    const exercises = snapshot.docs.map((doc) => doc.data());
    return exercises;
});
exports.fetchExercises = fetchExercises;
const fetchExercisesByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = connection_1.default.collection("exercises");
    const query = collection.where("category", "==", category);
    const snapshot = yield query.get();
    const exercises = snapshot.docs.map((doc) => doc.data());
    if (exercises.length === 0) {
        return Promise.reject({
            code: 400,
            msg: `No exercises found for category ${category}`,
        });
    }
    return exercises;
});
exports.fetchExercisesByCategory = fetchExercisesByCategory;
