import { useState } from "react";

function TodoListItems({ item, indexNum, todoList, setTodoList, handleEdit }) {
    const [status, setStatus] = useState(item.status);

    const cycleStatus = () => {
        const statuses = ["TO DO", "IN PROGRESS", "IN QA", "DONE"];
        const nextIndex = (statuses.indexOf(status) + 1) % statuses.length;
        const updatedStatus = statuses[nextIndex];

        setStatus(updatedStatus);

        const updatedList = [...todoList];
        updatedList[indexNum].status = updatedStatus;
        setTodoList(updatedList);
    };

    const delRow = () => {
        const finalData = todoList.filter((value, index) => index != indexNum)
        setTodoList(finalData)

    };

    const getStatusClass = (status) => {
        switch (status) {
            case "TO DO": return "status-todo";
            case "IN PROGRESS": return "status-progress";
            case "IN QA": return "status-qa";
            case "DONE": return "status-done";
            default: return "";
        }
    };

    return (
        <li className={`todo-item ${getStatusClass(status)} ${status === "DONE" ? "completetodo" : ""}`}>
            <div onClick={cycleStatus}>
                <strong>{indexNum + 1}. {item.title}</strong> : <span>{item.description}</span>
                <div className="status-text">Status: {status}</div>
            </div>
            <span
                className="action-button update"
                onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(indexNum);
                }}
            >
                Update
            </span>
            <span className="action-button delete" onClick={delRow}>
                Delete
            </span>
        </li>
    );
}
export default TodoListItems;