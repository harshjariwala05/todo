import { useState, useRef } from "react";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import { FaAngleDown, FaAngleUp, FaCheckCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

function TodoListItems({ item, indexNum, todoList, setTodoList, handleEdit }) {
   const [status, setStatus] = useState(item.status || "IN PROGRESS");
   const [filter, setFilter] = useState("");
   const [statusMenuState, toggleStatusMenu] = useMenuState({ transition: true });
   const actionRef = useRef(null);
   const statusRef = useRef(null);
   const [actionMenuState, setActionMenuState] = useState({ state: "closed" });

   const toggleActionMenu = () => {
      setActionMenuState((prev) => ({
         state: prev.state === "open" ? "closed" : "open"
      }));
   };

   const updateStatus = (newStatus) => {
      setStatus(newStatus);
      const updatedList = [...todoList];
      updatedList[indexNum].status = newStatus;
      setTodoList(updatedList);
      toggleStatusMenu(false);
   };

   const delRow = () => {
      const finalData = todoList.filter((value, index) => index !== indexNum);
      setTodoList(finalData);
   };

   const statusColor = {
      "OPEN": "#999999",
      "PENDING": "#f0ad4e",
      "IN PROGRESS": "#d63384",
      "COMPLETED": "#000000",
      "IN REVIEW": "#fd7e14",
      "ACCEPTED": "#d9534f",
      "REJECTED": "#800080",
      "CLOSED": "#28a745",
   };

   const renderStatusMenu = () => {
      const groupedStatus = [
         {
            title: "Not started",
            statuses: ["OPEN"]
         },
         {
            title: "Active",
            statuses: ["PENDING", "IN PROGRESS", "COMPLETED", "IN REVIEW", "ACCEPTED", "REJECTED"]
         }
      ];

      return (
         <>
            {groupedStatus.map((section, i) => (
               <div key={section.title}>
                  <div
                     style={{
                        padding: "8px 15px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#666",
                        background: "#f9f9f9",
                        borderTop: i !== 0 ? "1px solid #ddd" : "none"
                     }}
                  >
                     {section.title}
                  </div>

                  {section.statuses
                     .filter((s) => s.toLowerCase().includes(filter.toLowerCase()))
                     .map((statusOpt) => (
                        <MenuItem key={statusOpt} onClick={() => updateStatus(statusOpt)}>
                           <div className="flex justify-between items-center w-full" >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                 <div
                                    style={{
                                       height: "10px",
                                       width: "10px",
                                       borderRadius: "50%",
                                       backgroundColor: statusColor[statusOpt],
                                    }}
                                 />
                                 <span style={{
                                    fontWeight: status === statusOpt ? "600" : "normal",
                                    color: "#333",
                                    fontSize: "14px"
                                 }}>
                                    {statusOpt}
                                 </span>
                              </div>
                              {status === statusOpt && (
                                 <span style={{ color: statusColor[statusOpt], fontWeight: "bold" }}>
                                    <FaCheckCircle color="gray" />
                                 </span>
                              )}
                           </div>
                        </MenuItem>
                     ))}
               </div>
            ))}

            <div style={{ borderTop: "1px solid #ddd", margin: "12px 0" }} />

            {"CLOSED".toLowerCase().includes(filter.toLowerCase()) && (
               <MenuItem onClick={() => updateStatus("CLOSED")}>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                     }}
                  >
                     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                           style={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "50%",
                              backgroundColor: statusColor["CLOSED"],
                           }}
                        />
                        <span style={{
                           fontWeight: status === "CLOSED" ? "600" : "normal",
                           color: "#333",
                           fontSize: "14px"
                        }}>
                           CLOSED
                        </span>
                     </div>
                     {status === "CLOSED" && (
                        <span style={{ color: statusColor["CLOSED"], fontWeight: "bold" }}>
                           <FaCheckCircle color="gray" />
                        </span>
                     )}
                  </div>
               </MenuItem>
            )}
         </>
      );
   };

   return (
      <li className="todo-item">
         <div>
            <p style={{
               fontSize: "20px",
               fontWeight: "600",
               marginBottom: "8px",
               textDecoration: status === "CLOSED" ? "line-through" : "none",
               color: status === "CLOSED" ? "#888" : "#333"
            }}>
               {item.title}
            </p>

            <div className="des-action">
               <p
                  style={{
                     fontSize: "17px",
                     color: "#555",
                     flex: 1,
                     textDecoration: status === "CLOSED" ? "line-through" : "none",
                  }}>
                  {item.description}
               </p>

               <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <span
                     ref={actionRef}
                     onClick={toggleActionMenu}
                     style={{
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "-15px",
                        fontWeight: "500",
                        fontSize: "17px",
                        color: "#007bff",
                     }}
                  >
                     Action
                     {actionMenuState.state === "open" ? <FaAngleUp size={14} /> : <FaAngleDown size={14} />}
                  </span>

                  <ControlledMenu
                     {...actionMenuState}
                     anchorRef={actionRef}
                     onClose={() => setActionMenuState({ state: "closed" })}
                     direction="right"
                  >
                     <MenuItem style={{ color: "green" }} onClick={() => handleEdit(indexNum)}>
                        <AiFillEdit style={{ marginRight: "7px", fontSize: "18px" }} />
                        Edit
                     </MenuItem>
                     <MenuItem style={{ color: "red" }} onClick={delRow}>
                        <RiDeleteBinLine style={{ marginRight: "7px", fontSize: "18px" }} />
                        Delete
                     </MenuItem>
                  </ControlledMenu>
               </div>
            </div>

            {item.dueDate && (
               <div
                  style={{
                     marginTop: "10px",
                     padding: "6px 0px",
                     borderRadius: "8px",
                     fontSize: "14px",
                     display: "inline-block",
                     color: "#444",
                     textDecoration: status === "CLOSED" ? "line-through" : "none",
                     color: status === "CLOSED" ? "#888" : "#333"
                  }}
               >
                  <span style={{
                     fontSize: "17px",
                     color: "#555",
                  }}>
                     Due Date: {new Date(item.dueDate).toLocaleDateString("en-GB")}
                  </span>
               </div>
            )}

            <div
               className="status-text"
               style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
               }}
            >
               <h6 style={{ margin: 0 }}>Status:</h6>

               <span
                  ref={statusRef}
                  onClick={() => toggleStatusMenu(true)}
                  style={{
                     cursor: "pointer",
                     background: statusColor[status],
                     color: "#fff",
                     padding: "6px 12px",
                     borderRadius: "20px",
                     fontSize: "13px",
                     minWidth: "120px",
                     justifyContent: 'center',
                     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
               >
                  {status}
               </span>

               <ControlledMenu
                  {...statusMenuState}
                  anchorRef={statusRef}
                  onClose={() => toggleStatusMenu(false)}
                  direction="top"
                  align="start"
                  position="anchor"
                  style={{
                     maxHeight: "400px",
                     overflowY: "auto",
                     width: "90vw",
                     maxWidth: "320px",
                     minWidth: "240px",
                     padding: "10px 0",
                     backgroundColor: "#fff",
                     boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                     borderRadius: "10px",
                     boxSizing: "border-box",
                     overflowX: "hidden",
                  }}
               >
                  <input
                     type="text"
                     placeholder="Search..."
                     value={filter}
                     onChange={(e) => setFilter(e.target.value)}
                     style={{
                        width: "90%",
                        margin: "10px auto 10px auto",
                        display: "block",
                        padding: "8px 12px",
                        fontSize: "14px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                     }}
                  />
                  {renderStatusMenu()}
               </ControlledMenu>
            </div>
         </div>
      </li>
   );
}

export default TodoListItems;