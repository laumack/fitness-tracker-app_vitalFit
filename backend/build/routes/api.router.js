"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exercise_router_1 = __importDefault(require("./exercise.router"));
const meals_router_1 = __importDefault(require("./meals.router"));
const mealPlan_router_1 = __importDefault(require("./mealPlan.router"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/exercises", exercise_router_1.default);
apiRouter.use("/recipe", meals_router_1.default);
apiRouter.use("/meal-plan", mealPlan_router_1.default);
exports.default = apiRouter;
