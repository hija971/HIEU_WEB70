import express from "express";
import crypto from "crypto";
const app = express();
app.use(express.json())

//params
const todoList = [
  {
    id: crypto.randomUUID(),
    todoName: "do stuff",
    date: new Date(),
    status: "pending",
  },
];
app.get("/api/v1/todo-list", (req, res) => {
  try {
    const queryParams = req.query
    const getTodoByFields = todoList.map((item) => {
        let mappingTodo = {};
        for (const key in item) {
            console.log(queryParams[key])
            if (Number(queryParams[key])) {
                mappingTodo[key] = item[key]
            } else if (Number(queryParams[key]) === 0) {
                const getNewItem = {
                    ...item
                }
                delete getNewItem[key]
                mappingTodo = {
                    ...getNewItem
                }
            } else {
                mappingTodo = {
                    ...item
                }
            }
        }
        return mappingTodo
    })
    res.send({
        data: getTodoByFields,
        message: 'thanh cong',
        success: true
    })
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

app.get("/api/v1/todo-list/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const findRecordTodo = todoList.find((item) => {
      return item.id === id;
    });
    if (!findRecordTodo) throw new Error("Not found");
    res.send({ data: findRecordTodo, message: "SUCCESS", success: true });
  } catch (error) {
    res.send({ data: null, message: error.message, success: false });
  }
});

app.post("/api/v1/todo-list", (req, res) => {
    const dataBody = req.body;
    todoList.push({
        ...dataBody,
        id: crypto.randomUUID()
    })
    res.send({
        data: todoList
    })
})

app.listen(5001, () => {
  console.log("my server is running");
});
