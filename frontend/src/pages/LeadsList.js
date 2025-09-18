import React, { useEffect, useState } from 'react';
import { listLeads, deleteLead, logout } from '../api';
import { useNavigate } from 'react-router-dom';

export default function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetch = async (p = page) => {
    try {
      const res = await listLeads({ page: p, limit });
      setLeads(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      else alert('Failed to fetch leads');
    }
  };

  useEffect(() => { fetch(1); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this lead?')) {
      await deleteLead(id);
      fetch(page);
    }
  };

  return (
    <div className="container">
      <h2>Leads</h2>
      <div className="button-group">
        <button onClick={() => navigate('/leads/new')}>New Lead</button>
        <button onClick={async () => { await logout(); navigate('/login'); }}>Logout</button>
      </div>

      <table className="leads-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>City</th>
            <th>Source</th>
            <th>Status</th>
            <th>Score</th>
            <th>Lead Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.first_name}</td>
              <td>{lead.last_name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone || '-'}</td>
              <td>{lead.company}</td>
              <td>{lead.city}</td>
              <td>{lead.source}</td>
              <td>{lead.status}</td>
              <td>{lead.score}</td>
              <td>{lead.lead_value}</td>
              <td className="actions">
                <button onClick={() => navigate(`/leads/${lead._id}/edit`)}>Edit</button>
                <button onClick={() => handleDelete(lead._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => fetch(page - 1)}>Prev</button>
        <span> Page {page} / {totalPages} </span>
        <button disabled={page >= totalPages} onClick={() => fetch(page + 1)}>Next</button>
      </div>
    </div>
  );
}
