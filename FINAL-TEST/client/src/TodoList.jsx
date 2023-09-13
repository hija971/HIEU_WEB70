import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const TodoList = ({ notDone }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTodos(savedTasks);
  }, []);

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("tasks", JSON.stringify(updatedTodos));
  };

  const filteredTodos = notDone ? todos.filter((todo) => !todo.completed) : todos

  return (
    <div className="todo-list-container">
      {filteredTodos.map((todo) => {
        const taskClassname = todo.completed
          ? "todo-item-container done"
          : "todo-item-container";
        return (
          <div
            className={taskClassname}
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed ? (
              <FaRegCheckCircle color="#9a9a9a" className="item-done-button" />
            ) : (
              <FaRegCircle className="item-done-button" color="#9a9a9a" />
            )}
            <div className="item-title">{todo.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
