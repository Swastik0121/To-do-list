import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // Fetches Todo from the api
  const fetchTodos = async () => {
    try {
      const response = await apiClient.get('todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  // Hook to fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

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

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await apiClient.patch(`todos/${id}/`, { completed: !currentStatus });
      fetchTodos();
    } catch (error) {
      console.error('Failed to update todo', error);
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
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <span
              onClick={() => {
                handleToggleComplete(todo.id, todo.completed);
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
