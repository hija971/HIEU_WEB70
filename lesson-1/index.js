const express = require("express");
const crypto = require("crypto");
const { sumFunction, multiply } = require("./math");
const fs = require("fs");

const numOne = 4,
  numTwo = 5;
const sum = sumFunction(numOne, numTwo);
const prod = multiply(numOne, numTwo);

const todoList = [];

const app = express();
const PORT = 3001;

app.get("", (req, res) => {
  res.send({
    message: "connection successful",
  });
});

app.get("/api/v1/todo-list", (req, res) => {
  res.send({
    data: todoList,
    message: "Success!",
    success: true,
  });
});

app.get("/api/v1/todo-list/remove-duplicate", (req, res) => {
  const mapFilter = todoList.filter((item, index) => {
    return todoList.findIndex((td) => td.nameTodo === item.nameTodo) === index;
  });
  todoList = mapFilter;
  res.send({
    data: todoList,
    message: "Success!",
    success: true,
  });
});

app.get("/api/v1/todo-list/add", (req, res) => {
  const newTodo = {
    id: crypto.randomUUID(),
    nameTodo: "bruhs name",
    createdAt: new Date(),
  };
  todoList.push(newTodo);
  res.send({
    data: {},
    message: "add successful",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`My server is running at PORT=${PORT}`);
});

// console.log(`sum of ${numOne} + ${numTwo} = ${sum}`);
// console.log(`product of ${numOne} * ${numTwo} = ${prod}`);

// fs.readFile("./text.txt", (err, data) => {
//   if (err) {
//     console.error("sumting wong", err);
//     return;
//   }
//   console.log("data:", data);
// });
