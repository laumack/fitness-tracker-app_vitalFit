"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExercisesByCategory = exports.getExercises = void 0;
const exercise_model_1 = require("../models/exercise.model");
const getExercises = (req, res, next) => {
    (0, exercise_model_1.fetchExercises)()
        .then((exercises) => {
        res.status(200).send({ exercises });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getExercises = getExercises;
const getExercisesByCategory = (req, res, next) => {
    const category = req.params.category;
    (0, exercise_model_1.fetchExercisesByCategory)(category)
        .then((exercises) => {
        res.status(200).send({ exercises });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getExercisesByCategory = getExercisesByCategory;
