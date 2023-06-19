"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meals_controller_1 = require("../controllers/meals.controller");
const exerciseRouter = (0, express_1.Router)();
exerciseRouter.route("/:id").get(meals_controller_1.getMealById);
exports.default = exerciseRouter;
