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

    return (
        <li className={status === "DONE" ? "completetodo" : ""} style={{ marginBottom: '10px' }}>
            <div onClick={cycleStatus} style={{ cursor: 'pointer' }}>
                <strong>{indexNum + 1}. {item.title}</strong> - {item.description}
                <div><em>Status:</em> {status}</div>
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