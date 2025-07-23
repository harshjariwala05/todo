import './App.css';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TodoListItems from './TodoListItems';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const saveTodoList = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    if (!title) {
      alert("Title is required");
      return;
    }

    if (!description) {
      alert("Description is required");
      return;
    }

    if (!dueDate) {
      alert("Due Date is required");
      return;
    }

    const newItem = {
      title,
      description,
      status: "IN PROGRESS",
      dueDate: dueDate ? dueDate.toISOString() : null,
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
    setDueDate(null);
    event.target.reset();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTitle(todoList[index].title);
    setDescription(todoList[index].description);
    setDueDate(dayjs(todoList[index].dueDate));
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
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <input
            type="text" 
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
              <DemoContainer
                components={['DatePicker']}
                sx={{
                  width: '100%',
                  overflow: 'visible',
                  '.MuiFormControl-root': {
                    width: '100%',
                  },
                  '.MuiInputBase-root': {
                    height: '40px',
                    fontSize: '14px',
                  },
                }}
              >
                <DatePicker
                  label="Due Date"
                  format="DD/MM/YYYY"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                    },
                  }}
                />

              </DemoContainer>
            </div>
          </LocalizationProvider>

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