import express from "express";
import crypto from "crypto";
const app = express();

const todoList = [
  {
    id: crypto.randomUUID(),
    todoName: "Làm gì đó 1",
    date: "24/07/2023",
    status: "PENDING",
  },
  {
    id: crypto.randomUUID(),
    todoName: "Làm gì đó 2",
    date: "23/07/2023",
    status: "TODO",
  },
  {
    id: crypto.randomUUID(),
    todoName: "Làm gì đó 3",
    date: "22/07/2023",
    status: "DOING",
  },
  {
    id: crypto.randomUUID(),
    todoName: "Làm gì đó 4",
    date: "21/07/2023",
    status: "DONE",
  },
];

//Filter fields
app.get("/api/homeworks/todo-list", (req, res) => {
  try {
    const queryParams = req.query;
    const getTodoFields = todoList.map((field) => {
      if (Object.keys(queryParams).length !== 0) {
        let mappingTodo = {};
        for (const key in field) {
          if (Number(queryParams[key])) {
            mappingTodo[key] = field[key];
          } else if (Number(queryParams[key]) === 0) {
            const getNewField = {
              ...field,
            };
            for (const keyOfQuery in queryParams) {
              delete getNewField[keyOfQuery];
            }
            mappingTodo = {
              ...getNewField,
            };
          } else if (!Object.keys(field).includes(queryParams[key])) {
            return field
          }
        }
        return mappingTodo;
      } else {
        return field;
      }
    });
    res.send({
      data: getTodoFields,
      message: "Get fields successfully",
      success: true,
    });
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

//params
app.get("/api/homeworks/todo-list/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const findTodo = todoList.find((item) => {
    return item.id === id;
  });
  console.log(findTodo);
  res.send({ data: findTodo, message: "SUCCESS", success: true });
});

app.listen(3001, () => {
  console.log("Server is running...");
});
