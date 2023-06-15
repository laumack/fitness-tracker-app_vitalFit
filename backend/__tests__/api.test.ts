import request from "supertest";
import app from "../app";
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  const { PORT = 9090 } = process.env;
  server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  done();
});

afterAll((done) => {
  server.close(done);
});

describe("GET /api/exercises", () => {
  it("should return an array of exercise objects", async () => {
    const res = await request(app).get("/api/exercises").expect(200);
    const { exercises } = res.body;
    expect(exercises.length).toBe(12);
    expect(exercises[0]).toHaveProperty("category");
    expect(exercises[0]).toHaveProperty("description");
    expect(exercises[0]).toHaveProperty("name");
  });
});

describe("GET /api/exercises/:category", () => {
  it("should return exercise objects matching the category", async () => {
    const res = await request(app).get("/api/exercises/advanced").expect(200);
    const { exercises } = res.body;
    expect(exercises[0].category).toBe("advanced");
  });

  it("should return 400 for an invalid category", async () => {
    const res = await request(app).get("/api/exercises/expert").expect(400);
    expect(res.body).toEqual({ msg: "No exercises found for category expert" });
  });
});

describe("GET /api/recipe", () => {
  it("should return exercise objects matching the category", async () => {
    const res = await request(app).get("/api/recipe/635446").expect(200);

    const title = res.body.meal.title;
    expect(typeof res.body).toBe("object");
    expect(title).toBe("Blueberry Cinnamon Porridge");
  });
});

describe("GET /api/meal-plan/:name", () => {
  it("should return exercise objects matching the category", async () => {
    const res = await request(app).get("/api/meal-plan/2000").expect(200);

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
  });
});
