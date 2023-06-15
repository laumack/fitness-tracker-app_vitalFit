const request = require("supertest");
import app from "../app";
import { Server } from "http";
let server: Server;

beforeAll((end: jest.DoneCallback) => {
  const { PORT = 9090 } = process.env;
  server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  end();
});
afterAll((end: jest.DoneCallback) => {
  server.close(end);
});

describe("GET /api/exercises", () => {
  it("status 200 - array of exercise objects", async () => {
    const res = await request(app).get("/api/exercises").expect(200);

    const parsedFile = JSON.parse(res.text);

    expect(parsedFile.exercises.length).toBe(12);
    expect(parsedFile.exercises[0]).toHaveProperty("category");
    expect(parsedFile.exercises[0]).toHaveProperty("description");
    expect(parsedFile.exercises[0]).toHaveProperty("name");
  });
});

describe("GET /api/exercises/:category", () => {
  it("status 200 - array of exercise objects to match category", async () => {
    const res = await request(app).get("/api/exercises/advanced").expect(200);

    const parsedFile = JSON.parse(res.text);
    const nested = parsedFile.exercises[0];

    expect(nested.category).toBe("advanced");
  });
  it("status 400 - invalid category inputted", async () => {
    const res = await request(app).get("/api/exercises/expert").expect(400);

    expect(JSON.parse(res.text)).toEqual({
      msg: "No exercises found for category expert",
    });
  });
});
