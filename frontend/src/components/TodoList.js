import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // States to track items getting editied
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  //States to implement search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Fetches Todo from the api
  const fetchTodos = async () => {
    try {
      const params = {
        search: searchTerm,
        completed: filterStatus,
      };
      const response = await apiClient.get('todos/', { params });
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  // Hook to fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, [searchTerm, filterStatus]);

  // Handler for adding todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await apiClient.post('todos/', { title });
      setTitle('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  };

  // Handler to delete Todo
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`todos/${id}/`);
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  // handler to toggle completion
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await apiClient.patch(`todos/${id}/`, { completed: !currentStatus });
      fetchTodos();
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  };

  // handler to edit
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  // handler to save
  const handleSave = async (id) => {
    try {
      await apiClient.patch(`todos/${id}/`, { title: editingText });
      setEditingId(null);
      setEditingText('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to save todo', error);
    }
  };

  // handler to handle saving when pressed enter
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleSave(id);
    }
  };

  return (
    <div>
      <h2>My To-do List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Add a new task'
        />
        <button type='submit'>Add Task</button>
      </form>

      {/* New Search and Filter UI element */}
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <input
          type='text'
          placeholder='Search tasks...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setFilterStatus('')}>All</button>
        <button onClick={() => setFilterStatus('true')}>Completed</button>
        <button onClick={() => setFilterStatus('false')}>Incomplete</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {editingId === todo.id ? (
              // It shows an input field when the id is being edited.
              <input
                type='text'
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => handleSave(todo.id)} // Save when focus is lost
                onKeyDown={(e, id) => handleKeyDown(e, todo.id)}
                autoFocus
              />
            ) : (
              // otherwise the title and edit button is visible
              <>
                <span
                  onClick={() => handleToggleComplete(todo.id, todo.completed)}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleEdit(todo)}
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
