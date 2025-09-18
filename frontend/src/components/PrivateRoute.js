import React, { useEffect, useState } from 'react';
import { me } from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // your main CSS file

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await me(); // will throw if 401
        setLoading(false);
      } catch (err) {
        navigate('/login');
      }
    })();
  }, [navigate]);

  if (loading) return <div className="loading">Loading...</div>;

  return <div className="private-route">{children}</div>;
}
