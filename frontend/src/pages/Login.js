import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // backend sets httpOnly cookie
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <form onSubmit={handle}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
      </form>
      <div>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}
