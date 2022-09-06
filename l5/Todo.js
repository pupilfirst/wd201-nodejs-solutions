const { DataTypes, Model, Op } = require("sequelize");

const { sequelize } = require("./connectDB.js");

const Todo = sequelize.define(
  "Todo",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "todo",
  }
);

Todo.prototype.displayableString = function () {
  let checkbox = this.complete ? "[x]" : "[ ]";
  let date =
    this.dueDate == new Date().toLocaleDateString("en-CA") ? "" : this.dueDate;
  return `${this.id}. ${checkbox} ${this.title} ${date}`.trim();
};

Todo.markAsComplete = function (id) {
  return Todo.update(
    { complete: true },
    {
      where: {
        id,
      },
    }
  );
};

Todo.addTask = async function (params) {
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return Todo.create({
    title: params.title,
    dueDate: new Date(today.getTime() + params.dueInDays * oneDay),
  });
};

Todo.showList = async function () {
  console.log("My Todo list \n");

  console.log("Overdue");

  const overdueItems = await Todo.overdue();
  console.log(overdueItems.map((item) => item.displayableString()).join("\n"));
  console.log("\n");

  console.log("Due Today");

  const dueItems = await Todo.dueToday();
  console.log(dueItems.map((item) => item.displayableString()).join("\n"));
  console.log("\n");

  console.log("Due Later");
  const dueLaterItems = await Todo.dueLater();
  console.log(dueLaterItems.map((item) => item.displayableString()).join("\n"));
};

Todo.overdue = function () {
  return Todo.findAll({
    where: {
      dueDate: {
        [Op.lt]: new Date(),
      },
    },
    order: [["id", "ASC"]],
  });
};

Todo.dueToday = function () {
  return Todo.findAll({
    where: {
      dueDate: {
        [Op.eq]: new Date(),
      },
    },
    order: [["id", "ASC"]],
  });
};

Todo.dueLater = function () {
  return Todo.findAll({
    where: {
      dueDate: {
        [Op.gt]: new Date(),
      },
    },
    order: [["id", "ASC"]],
  });
};

module.exports = Todo;
