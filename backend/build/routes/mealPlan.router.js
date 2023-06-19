"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mealPlan_controller_1 = require("../controllers/mealPlan.controller");
const exerciseRouter = (0, express_1.Router)();
exerciseRouter.route("/:name").get(mealPlan_controller_1.getMealPlan);
exports.default = exerciseRouter;
