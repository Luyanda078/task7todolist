import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./todo.css"
function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleAddTask = () => {
    axios.post('http://localhost:3001/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', priority: 'medium' });
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleUpdateTask = (task) => {
    axios.put(`http://localhost:3001/tasks/${task.id}`, task)
      .then(response => {
        setTasks(tasks.map(t => t.id === task.id ? task : t));
        setEditingTask(null);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(t => t.id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handlePriorityChange = (event) => {
    setNewTask({ ...newTask, priority: event.target.value });
  };
  const handleEditTaskChange = (event, field) => {
    setEditingTask({ ...editingTask, [field]: event.target.value });
  };
  return (
    <div className='todo'>
      <h1>Todo Page</h1>
      <form className='todo-form'>
        <label>
          Title:
          <input type="text" value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} placeholder='Title'/>
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} />
        </label>
        <br />
        <label>
          Priority:
          <select value={newTask.priority} onChange={handlePriorityChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <br />
        <button type="submit" onClick={handleAddTask}>Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <button className='edit-btn' onClick={() => setEditingTask(task)}>Edit</button>
            <button className='delete-btn' onClick={() => handleDeleteTask(task.id)}>Delete</button>
            {editingTask === task && (
              <form>
                <label>
                  Title:
                  <input type="text" value={editingTask.title} onChange={(event) => handleEditTaskChange(event, 'title')} />
                </label>
                <br />
                <label>
                  Description:
                  <input type="text" value={editingTask.description} onChange={(event) => handleEditTaskChange(event, 'description')} />
                </label>
                <br />
                <label>
                  Priority:
                  <select value={editingTask.priority} onChange={(event) => handleEditTaskChange(event, 'priority')}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
                <br />
                <button type="submit" onClick={() => handleUpdateTask(editingTask)}>Update Task</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoPage;