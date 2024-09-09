import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToDoListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium' });
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) return;

    axios.post('http://localhost:3001/todos', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', priority: 'Medium' });
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  // Update an existing task
  const handleUpdateTask = (task) => {
    axios.put(`http://localhost:3001/todos/${task.id}`, task)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
        setEditingTask(null);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/todos/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  // Handle priority change for new tasks
  const handlePriorityChange = (event) => {
    setNewTask({ ...newTask, priority: event.target.value });
  };

  // Handle changes for editing tasks
  const handleEditTaskChange = (event, field) => {
    setEditingTask({ ...editingTask, [field]: event.target.value });
  };

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    form: {
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      margin: '5px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      boxSizing: 'border-box',
    },
    select: {
      padding: '10px',
      fontSize: '16px',
      margin: '5px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '5px',
      backgroundColor: '#5B67CA',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#4A56B5',
    },
    taskList: {
      listStyleType: 'none',
      padding: '0',
      textAlign: 'left',
    },
    taskItem: {
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      background: '#fff',
      boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    taskDetails: {
      flex: '1',
    },
    priorityHigh: {
      backgroundColor: '#ffdddd',
      borderColor: '#f5a9a9',
    },
    priorityMedium: {
      backgroundColor: '#ffffdd',
      borderColor: '#ffe066',
    },
    priorityLow: {
      backgroundColor: '#ddffdd',
      borderColor: '#a9f5a9',
    },
    editButton: {
      margin: '5px',
      padding: '8px 12px',
      borderRadius: '5px',
      backgroundColor: '#5B67CA',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    editButtonHover: {
      backgroundColor: '#4A56B5',
    },
    deleteButton: {
      margin: '5px',
      padding: '8px 12px',
      borderRadius: '5px',
      backgroundColor: '#ff4d4d',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    deleteButtonHover: {
      backgroundColor: '#e43d3d',
    },
  };

  return (
    <div style={styles.container}>
      <h1>My To Do List</h1>
      <form style={styles.form} onSubmit={handleAddTask}>
        <label style={styles.label}>
          Title:
          <input
            type="text"
            value={newTask.title}
            onChange={(event) => setNewTask({ ...newTask, title: event.target.value })}
            placeholder='Title'
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Description:
          <input
            type="text"
            value={newTask.description}
            onChange={(event) => setNewTask({ ...newTask, description: event.target.value })}
            placeholder='Description'
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Priority:
          <select value={newTask.priority} onChange={handlePriorityChange} style={styles.select}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <button type="submit" style={styles.button}>Add Task</button>
      </form>

      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              ...styles.taskItem,
              ...(task.priority === 'High' ? styles.priorityHigh : 
                  task.priority === 'Medium' ? styles.priorityMedium : 
                  styles.priorityLow),
            }}
          >
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
            </div>
            <div>
              <button style={styles.editButton} onClick={() => setEditingTask(task)}>Edit</button>
              <button style={styles.deleteButton} onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
            {editingTask && editingTask.id === task.id && (
              <form style={styles.form} onSubmit={(e) => { e.preventDefault(); handleUpdateTask(editingTask); }}>
                <label style={styles.label}>
                  Title:
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(event) => handleEditTaskChange(event, 'title')}
                    style={styles.input}
                    required
                  />
                </label>
                <label style={styles.label}>
                  Description:
                  <input
                    type="text"
                    value={editingTask.description}
                    onChange={(event) => handleEditTaskChange(event, 'description')}
                    style={styles.input}
                    required
                  />
                </label>
                <label style={styles.label}>
                  Priority:
                  <select
                    value={editingTask.priority}
                    onChange={(event) => handleEditTaskChange(event, 'priority')}
                    style={styles.select}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>
                <button type="submit" style={styles.button}>Update Task</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoListPage;
