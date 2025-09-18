import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      alert('Registered. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Register</h2>
      <form onSubmit={handle}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /><br/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
