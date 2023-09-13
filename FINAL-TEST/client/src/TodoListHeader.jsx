import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "./LanguageContext.jsx";
import translationData from "./translationData.json";

const Header = ({ setUnDone }) => {
  const [todos, setTodos] = useState([]);
  const [showUnDone, setShowUnDone] = useState(false);
  const { language } = useContext(LanguageContext);
  const translation = translationData[language].header;

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTodos(savedTasks);
  }, [todos]);

  const incompleteTasks = todos.filter((todo) => !todo.completed);

  const handleClickBox = (e) => {
    setShowUnDone(e.target.checked);
    setUnDone(e.target.checked);
  };
  return (
    <div className="header">
      {translation.leftTitle} {incompleteTasks.length} {translation.rightTitle}
      <span className="not-complete-check">
        <input
          type="checkbox"
          checked={showUnDone}
          onChange={handleClickBox}
        />
        <span className="not-complete-title">{translation.onlyIncompleted}</span>
      </span>
    </div>
  );
};

export default Header;
