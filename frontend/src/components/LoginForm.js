import React, {useState} from "react";
import axios from 'axios';

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: username,
                password: password
            });
            if (response.data.access) {
                const token = response.data.access;
                setToken(token);
                localStorage.setItem('token', token);   
            }    
        }catch (err) {
            setError('Invalid credentials. Please try again.');                
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>            
        </form>
    );
};

export default LoginForm;


