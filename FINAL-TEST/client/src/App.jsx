import './index.css'
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

const Home = () => {
  const [notDone, setNotDone] = useState(false)
  return (
    <div className="App">
      <div className="container">
        <TodoListHeader setNotDone={setNotDone}/>
        <TodoList notDone={notDone}/>
        <Form />
      </div>
      <Footer />
    </div>
  );
};
