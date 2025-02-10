import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./ProfilePage";

import "../styles/HomePage.css";

function HomePage() {
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [taskText, setTaskText] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  const addBoard = () => {
    if (boardName.trim() === "") return;
    setBoards([...boards, { id: Date.now(), name: boardName, tasks: [] }]);
    setBoardName("");
  };

  const addTask = (boardId) => {
    if (taskText.trim() === "") return;
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: [...board.tasks, { id: Date.now(), text: taskText }] }
          : board
      )
    );
    setTaskText("");
  };

  const deleteTask = (boardId, taskId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) }
          : board
      )
    );
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setUpdatedText(task.text);
  };

  const updateTask = (boardId, taskId) => {
    if (updatedText.trim() === "") return;
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId ? { ...task, text: updatedText } : task
              ),
            }
          : board
      )
    );
    setEditingTask(null);
  };

  const onDragStart = (e, taskId, sourceBoardId) => {
    e.dataTransfer.setData("taskId", taskId.toString());
    e.dataTransfer.setData("sourceBoardId", sourceBoardId.toString());
  };

  const onDragOver = (e) => {
    e.preventDefault(); 
  };

  const onDrop = (e, targetBoardId) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const sourceBoardId = parseInt(e.dataTransfer.getData("sourceBoardId"));

    if (sourceBoardId === targetBoardId) return; // Avoid in same board

    // Find and move the task between boards
    setBoards((prevBoards) => {
      let taskToMove;

      const updatedBoards = prevBoards.map((board) => {
        if (board.id === sourceBoardId) {
          taskToMove = board.tasks.find((task) => task.id === taskId);
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        }
        return board;
      });

      return updatedBoards.map((board) =>
        board.id === targetBoardId && taskToMove
          ? { ...board, tasks: [...board.tasks, taskToMove] }
          : board
      );
    });
  };

  return (
    <div className="home-container">
      <header className="header">
        <nav className="nav-links">
          <Link to="/HomePage" className="nav-item"><span>Home</span></Link>
          <Link to="/HomePage/profilepage" className="nav-item">Profile</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<h2>Task Manager</h2>} />
        <Route path="/profilepage" element={<ProfilePage />} />
      </Routes>

      <div className="board-input">
        <input
          type="text"
          placeholder="Enter Board Name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <button onClick={addBoard}>Add Board</button>
      </div>
      
      <div className="boards-container">
        {boards.map((board) => (
          <div
            key={board.id}
            className="board"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, board.id)}
          >
            <h3>{board.name}</h3>
            <div className="task-input">
              <input
                type="text"
                placeholder="Enter Task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
              <button onClick={() => addTask(board.id)}>Add Task</button>
            </div>
            <div className="tasks-list">
              {board.tasks.map((task) => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id, board.id)}
                >
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                    />
                  ) : (
                    <span>{task.text}</span>
                  )}
                  <button onClick={() => deleteTask(board.id, task.id)}>Delete</button>
                  {editingTask === task.id ? (
                    <button onClick={() => updateTask(board.id, task.id)}>Save</button>
                  ) : (
                    <button onClick={() => startEditing(task)}>Update</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
