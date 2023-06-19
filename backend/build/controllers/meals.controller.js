"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMealById = void 0;
const meals_model_1 = require("../models/meals.model");
const getMealById = (req, res, next) => {
    const id = req.params.id;
    (0, meals_model_1.fetchRecipeByMealId)(id)
        .then((meal) => {
        res.status(200).send({ meal });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getMealById = getMealById;
