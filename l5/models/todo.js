"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");

      const overdueItems = await Todo.overdue();
      console.log(
        overdueItems.map((item) => item.displayableString()).join("\n")
      );
      console.log("\n");

      console.log("Due Today");

      const dueItems = await Todo.dueToday();
      console.log(dueItems.map((item) => item.displayableString()).join("\n"));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      console.log(
        dueLaterItems.map((item) => item.displayableString()).join("\n")
      );
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      return Todo.update(
        { completed: true },
        {
          where: {
            id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let date =
        this.dueDate === new Date().toLocaleDateString("en-CA")
          ? ""
          : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${date}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
