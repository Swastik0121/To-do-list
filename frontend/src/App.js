import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  // checks localStorage for a token on initial load
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Todo App</h1>
        {token && <button onClick={handleLogout}>Logout</button>}
      </header>
      <main>
        {!token ? (
          <LoginForm setToken={setToken} />
        ) : (
          <TodoList /> // Displays the TodoList when Logged in.
        )}
      </main>
    </div>
  );
}

export default App;
