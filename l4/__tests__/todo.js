// __tests__/todo.js
let todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
/* eslint-disable no-undef */
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    // Seed the test data
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    [
      {
        title: "Buy milk",
        completed: false,
        dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Pay rent",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Submit assignment",
        completed: false,
        dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });
  test("Should add a new todo", () => {
    expect(all.length).toEqual(3);

    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should retrieve overdue items", () => {
    expect(overdue().length).toEqual(1);
  });

  test("Should retrieve due today items", () => {
    expect(dueToday().length).toEqual(2);
  });

  test("Should retrieve due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});
