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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
let server;
beforeAll((done) => {
    const { PORT = 9090 } = process.env;
    server = app_1.default.listen(PORT, () => console.log(`Listening on ${PORT}`));
    done();
});
afterAll((done) => {
    server.close(done);
});
describe("GET /api/exercises", () => {
    it("should return an array of exercise objects", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/exercises").expect(200);
        const { exercises } = res.body;
        expect(exercises.length).toBe(12);
        expect(exercises[0]).toHaveProperty("category");
        expect(exercises[0]).toHaveProperty("description");
        expect(exercises[0]).toHaveProperty("name");
    }));
});
describe("GET /api/exercises/:category", () => {
    it("should return exercise objects matching the category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/exercises/advanced").expect(200);
        const { exercises } = res.body;
        expect(exercises[0].category).toBe("advanced");
    }));
    it("should return 400 for an invalid category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/exercises/expert").expect(400);
        expect(res.body).toEqual({ msg: "No exercises found for category expert" });
    }));
});
describe("GET /api/recipe", () => {
    it("should return exercise objects matching the category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/recipe/635446").expect(200);
        const title = res.body.meal.title;
        expect(typeof res.body).toBe("object");
        expect(title).toBe("Blueberry Cinnamon Porridge");
    }));
});
describe("GET /api/meal-plan/:name", () => {
    it("should return exercise objects matching the category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/meal-plan/2000").expect(200);
        expect(typeof res.body).toBe("object");
        expect(Object.keys(res.body.meal.week)).toEqual([
            "sunday",
            "saturday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "monday",
        ]);
    }));
});
