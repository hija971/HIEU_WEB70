import "./index.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "./LanguageContext.jsx";

export default function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </LanguageProvider>
    </div>
  );
}

const Home = () => {
  const [unDone, setUnDone] = useState(false);
  return (
    <div className="App">
      <div className="container">
        <TodoListHeader setUnDone={setUnDone} />
        <TodoList unDone={unDone} />
        <Form />
      </div>
      <Footer />
    </div>
  );
};
