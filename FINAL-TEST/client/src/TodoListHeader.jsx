import { useState, useEffect } from "react";

const Header = ({setNotDone}) => {
  const [todos, setTodos] = useState([]);
  const [showNotDone, setShowNotDone] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTodos(savedTasks);
  }, []);

  const incompleteTasks = todos.filter((todo) => !todo.completed);

  const handleClickBox = (e) => {
    setShowNotDone(e.target.checked);
    setNotDone(e.target.checked)
  };
  return (
    <div className="header">
      <span>You have {incompleteTasks.length} tasks left!</span>
      <span className="not-complete-check">
        <input
          type="checkbox"
          checked={showNotDone}
          onChange={handleClickBox}
        />
        <span className="not-complete-title">Not finished only</span>
      </span>
    </div>
  );
};

export default Header;
