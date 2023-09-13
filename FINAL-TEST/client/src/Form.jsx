import { useState } from "react";

const Form = () => {
  const [todos, setTodos] = useState([]);

  const [newInput, setNewInput] = useState("");

  const [dueDate, setDueDate] = useState("")

  const handleChange = (e) => {
    setNewInput(e.target.value);
  };

  const handleSubmit = () => {
    if (newInput.trim() !== "") {
      const newTask = {
        id: crypto.randomUUID(),
        title: newInput,
        completed: false,
      };

      const updatedTodos = [...todos, newTask];
      saveTodosToLocalStorage(updatedTodos);
      setNewInput("");
    }
  };

  const saveTodosToLocalStorage = (updatedTodos) => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    const newTasks = [...savedTasks, ...updatedTodos]
    setTodos(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newInput}
        onChange={handleChange}
        placeholder="Enter task ..."
      />
      <button>Submit</button>
    </form>
  );
};

export default Form;
