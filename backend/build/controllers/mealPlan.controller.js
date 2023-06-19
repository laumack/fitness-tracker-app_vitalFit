"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMealPlan = void 0;
const mealPlan_model_1 = require("../models/mealPlan.model");
const getMealPlan = (req, res, next) => {
    const name = req.params.name;
    (0, mealPlan_model_1.fetchMealPlan)(name)
        .then((meal) => {
        res.status(200).send({ meal });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getMealPlan = getMealPlan;
