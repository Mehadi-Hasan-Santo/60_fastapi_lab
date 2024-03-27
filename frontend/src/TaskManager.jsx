import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css'; // Add your custom styles here

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', body: '' });
  const [editTaskId, setEditTaskId] = useState(null);

  const addTask = () => {
    if (newTask.title.trim() !== '' && newTask.body.trim() !== '') {
      if (editTaskId !== null) {
        const updatedTasks = tasks.map(task =>
          task.id === editTaskId ? { ...task, title: newTask.title, body: newTask.body } : task
        );
        setTasks(updatedTasks);
        setEditTaskId(null);
      } else {
        setTasks([...tasks, { id: Date.now(), title: newTask.title, body: newTask.body }]);
      }
      setNewTask({ title: '', body: '' });
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    setEditTaskId(id);
    const taskToEdit = tasks.find(task => task.id === id);
    setNewTask({ title: taskToEdit.title, body: taskToEdit.body });
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          className="form-control mt-2"
          placeholder="Task Body"
          value={newTask.body}
          onChange={(e) => setNewTask({ ...newTask, body: e.target.value })}
        ></textarea>
        <button className="btn btn-primary mt-2" onClick={addTask}>
          {editTaskId !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>{task.body}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-sm btn-outline-info me-2"
                onClick={() => editTask(task.id)}
              >
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
