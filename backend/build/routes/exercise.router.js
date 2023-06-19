"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercise_controller_1 = require("../controllers/exercise.controller");
const exerciseRouter = (0, express_1.Router)();
exerciseRouter.route("/").get(exercise_controller_1.getExercises);
exerciseRouter.route("/:category").get(exercise_controller_1.getExercisesByCategory);
exports.default = exerciseRouter;
