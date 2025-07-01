import './App.css';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentValue, setCurrentValue] = useState("");

  const saveTodoList = (event) => {
    event.preventDefault();
    let toname = event.target.toname.value;


    if (editingIndex !== null) {

      const updatedList = [...todoList];
      updatedList[editingIndex] = toname;
      setTodoList(updatedList);
      setEditingIndex(null);
    }
    else {

      if (!todoList.includes(toname)) {
        setTodoList([...todoList, toname]);
      } else {
        alert("Todo already exists");
      }
    }

    setCurrentValue("");
    event.target.reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentValue(todoList[index]);
  };

  const list = todoList.map((value, index) => (
    <TodoListItems
      key={index}
      value={value}
      indexNum={index}
      todoList={todoList}
      setTodoList={setTodoList}
      handleEdit={handleEdit}
    />
  ));

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={saveTodoList}>
        <input
          type="text"
          name="toname"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
        <button>{editingIndex !== null ? "Update" : "Save"}</button>
      </form>

      <div className="outside">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function TodoListItems({ value, indexNum, todoList, setTodoList, handleEdit }) {
  const [status, setStatus] = useState(false);

  const checkeStatus = () => {
    setStatus(!status);
  };

  const delRow = () => {
    const finalData = todoList.filter((value, index) => index != indexNum)
    setTodoList(finalData)
  }


  return (
    <li className={status ? "completetodo" : ""} onClick={checkeStatus}>
      {indexNum + 1}. {value}
      <span onClick={(e) => {
        e.stopPropagation();
        handleEdit(indexNum);
      }}
        style={{ marginRight: "44px", cursor: "pointer" }}
      >
        Update
      </span>
      <span onClick={delRow} style={{ cursor: "pointer" }}>
        &times;
      </span>
    </li>
  );
}
