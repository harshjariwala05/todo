import './App.css';
import { useState } from 'react';
import TodoListItems from './TodoListItems';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveTodoList = (event) => {
    event.preventDefault();
    let title = event.target.title.value;
    let description = event.target.description.value;

    if (!title) {
      alert("Title is required");
      return;
    }
    if (!description) {
      alert("Description is required");
      return;
    }

    const newItem = {
      title,
      description,
      status: "TO DO",
    };

    if (editingIndex !== null) {
      const updatedList = [...todoList];
      updatedList[editingIndex] = { ...updatedList[editingIndex], ...newItem };
      setTodoList(updatedList);
      setEditingIndex(null);
    } else {
      const exists = todoList.some(item => item.title === title);
      if (!exists) {
        setTodoList([...todoList, newItem]);
      } else {
        alert("Todo with this title already exists");
      }
    }

    setTitle("");
    setDescription("");
    event.target.reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTitle(todoList[index].title);
    setDescription(todoList[index].description);
  };

  const list = todoList.map((item, index) => (
    <TodoListItems
      key={index}
      item={item}
      indexNum={index}
      todoList={todoList}
      setTodoList={setTodoList}
      handleEdit={handleEdit}
    />
  ));

  return (
    <div className="App">
      <div className="form-container">
        <h1 className="heading">Todo List</h1>

        <form className="todo-form" onSubmit={saveTodoList}>
          <input
            type="text"
            placeholder="Title"
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <input
            type="text"
            placeholder="Description"
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}

          />

          <button className={`submit-btn ${editingIndex !== null ? "update" : ""}`}>
            {editingIndex !== null ? "Update" : "Save"}
          </button>
        </form>
      </div>

      <div className="todo-container">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;