import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await apiClient.get('todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`todos/${id}/`);
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo', error);
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
          <li key={todo.id}>
            {todo.title}
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
