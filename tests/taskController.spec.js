const Task = require("../models/Task");
const app = require("../app");
const supertest = require("supertest");

const request = supertest(app);

async function generateTaskSeeds() {
  for (let i = 0; i < 5; i++) {
    await Task.create({
      task: `Task ${i}`,
      date: new Date(),
      description: `Description ${i}`,
      time: "10:00",
      categoryChoosed: "Work",
    });
  }
}

describe("Task Controller - integration test", () => {
  beforeEach(async () => {
    await Task.deleteMany();
  });

  it("all empty - without search", async () => {
    const response = await request.get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("all with values - without search", async () => {
    await generateTaskSeeds();
    const response = await request.get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    const firstTask = response.body[0];
    expect(firstTask).toHaveProperty("task", "Task 0");
    expect(firstTask).toHaveProperty("description", "Description 0");
    expect(firstTask).toHaveProperty("categoryChoosed", "Work");
  });
});
