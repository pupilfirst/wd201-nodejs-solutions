/* eslint-disable no-undef */
const Todo = require("./Todo.js");
const { sequelize } = require("./connectDB.js");
describe("Test list of items", function () {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  test("Add overdue item", async () => {
    const todo = await Todo.addTask({
      title: "This is a sample item",
      dueInDays: -2,
      complete: false,
    });
    const items = await Todo.overdue();
    expect(items.length).toBe(1);
  });

  test("Add due today item", async () => {
    const todo = await Todo.addTask({
      title: "This is a sample item",
      dueInDays: 0,
      complete: false,
    });
    const items = await Todo.dueToday();
    expect(items.length).toBe(1);
  });

  test("Add due later item", async () => {
    const todo = await Todo.addTask({
      title: "This is a sample item",
      dueInDays: 2,
      complete: false,
    });
    const items = await Todo.dueLater();
    expect(items.length).toBe(1);
  });

  test("Mark as complete functionality", async () => {
    const overdueItems = await Todo.overdue();
    expect(overdueItems.length).toBe(1);
    const aTodo = overdueItems[0];
    expect(aTodo.complete).toBe(false);
    await Todo.markAsComplete(aTodo.id);
    await aTodo.reload();

    expect(aTodo.complete).toBe(true);
  });

  test("Test completed displayable string", async () => {
    const overdueItems = await Todo.overdue();
    expect(overdueItems.length).toBe(1);
    const aTodo = overdueItems[0];
    expect(aTodo.complete).toBe(true);
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(
      `${aTodo.id}. [x] ${aTodo.title} ${aTodo.dueDate}`
    );
  });

  test("Test incomplete displayable string", async () => {
    const dueLaterItems = await Todo.dueLater();
    expect(dueLaterItems.length).toBe(1);
    const aTodo = dueLaterItems[0];
    expect(aTodo.complete).toBe(false);
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(
      `${aTodo.id}. [ ] ${aTodo.title} ${aTodo.dueDate}`
    );
  });

  test("Test incomplete dueToday displayable string", async () => {
    const dueTodayItems = await Todo.dueToday();
    expect(dueTodayItems.length).toBe(1);
    const aTodo = dueTodayItems[0];
    expect(aTodo.complete).toBe(false);
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(`${aTodo.id}. [ ] ${aTodo.title}`);
  });

  test("Test completed dueToday displayable string", async () => {
    const dueTodayItems = await Todo.dueToday();
    expect(dueTodayItems.length).toBe(1);
    const aTodo = dueTodayItems[0];
    expect(aTodo.complete).toBe(false);
    await Todo.markAsComplete(aTodo.id);
    await aTodo.reload();
    const displayValue = aTodo.displayableString();
    expect(displayValue).toBe(`${aTodo.id}. [x] ${aTodo.title}`);
  });
});
