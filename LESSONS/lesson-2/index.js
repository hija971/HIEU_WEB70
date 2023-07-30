import express from "express";
import crypto from "crypto";
import { error } from "console";
const app = express();
const PORT = 5001;
app.use(express.json());

const todoList = [
  {
    id: crypto.randomUUID(),
    todoName: "do stuff",
    date: new Date(),
    status: "PENDING",
  },
  {
    id: crypto.randomUUID(),
    todoName: "do other stuff",
    date: new Date(),
    status: "PENDING",
  },
  {
    id: crypto.randomUUID(),
    todoName: "do other other stuff",
    date: new Date(),
    status: "PENDING",
  },
];

//query params
app.get("/api/v1/todo-list", (req, res) => {
  try {
    const queryParams = req.query;
    const getTodoByFields = todoList.map((item) => {
      if (Object.keys(queryParams).length !== 0) {
        let mappingTodo = {};
        for (const key in item) {
          console.log(queryParams[key]);
          if (Number(queryParams[key])) {
            mappingTodo[key] = item[key];
          } else if (Number(queryParams[key]) === 0) {
            const getNewItem = {
              ...item,
            };
            for (const keyOfQuery in queryParams) {
              delete getNewItem[keyOfQuery];
            }
            mappingTodo = {
              ...getNewItem,
            };
          }
        }
        return mappingTodo;
      } else {
        return item;
      }
    });
    res.send({
      data: getTodoByFields,
      message: "thanh cong",
      success: true,
    });
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

//params
app.get("/api/v1/todo-list/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const findRecordTodo = todoList.find((item) => {
      return item.id === id;
    });
    console.log(findRecordTodo);

    if (!findRecordTodo) throw new Error("Not found");
    res.send({ data: findRecordTodo, message: "SUCCESS", success: true });
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

//body, post
app.post("/api/v1/todo-list", (req, res) => {
  const dataBody = req.body;
  todoList.push({
    id: crypto.randomUUID(),
    ...dataBody,
  });
  // todoList.reverse();
  res.send({
    data: todoList,
  });
});

//put
app.put("/api/v1/todo-list/:id", (req, res) => {
  try {
    const fieldsUpdate = req.body;
    const { id } = req.params;
    const findTodoItem = todoList.find((item) => item.id === id);
    if (!findTodoItem) throw new Error(`Can't find todo item with id: ${id}`);
    for (const key in fieldsUpdate) {
      if (findTodoItem[key] !== "undefined") {
        findTodoItem[key] = fieldsUpdate[key];
      }
      res.status(201).send({
        data: todoList,
        success: true,
        message: "SUCCESS",
      });
    }
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

//delete
app.delete("/api/v1/todo-list/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = todoList.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      todoList.splice(index, 1);
      res.status(201).send({
        data: todoList,
        success: true,
        message: "Delete successfully",
      });
    } else {
      res.status(404).send({
        data: null,
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`My server is running at port ${PORT}`);
});
