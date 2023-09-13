import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "./LanguageContext.jsx";
import translationData from "./translationData.json";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({ unDone }) => {
  const [todos, setTodos] = useState([]);

  const { language } = useContext(LanguageContext);
  const translation = translationData[language].todoList;

  const getRemainingDays = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return remainingDays;
  };

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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTodos = [...todos];
    const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(updatedTodos);
    localStorage.setItem("tasks", JSON.stringify(updatedTodos));
  };

  const filteredTodos = unDone
    ? todos.filter((todo) => !todo.completed)
    : todos;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="todo-list-container">
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={todo.completed ? "todo-item-container done" : "todo-item-container"}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      <div style={{ display: "flex" }}>
                        {todo.completed ? (
                          <FaRegCheckCircle color="#9a9a9a" className="item-done-button" />
                        ) : (
                          <FaRegCircle className="item-done-button" color="#9a9a9a" />
                        )}
                        <div className="item-title">{todo.title}</div>
                      </div>
                      <div className="remaining-days">
                        {getRemainingDays(todo.dueDate)} {translation.days}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

export default TodoList;
