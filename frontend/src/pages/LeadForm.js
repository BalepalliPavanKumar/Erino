import React, { useState, useEffect } from 'react';
import { createLead, getLead, updateLead } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'; // Make sure you have your styles here

export default function LeadForm() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    state: '',
    source: 'web',
    status: 'new',
    score: 0,
    lead_value: 0,
    is_qualified: false,
    last_activity_at: null
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const editing = !!id;

  // Load lead if editing
  useEffect(() => {
    if (editing) {
      (async () => {
        try {
          const res = await getLead(id);
          const data = res.data;
          const [first_name, ...rest] = (data.name || '').split(' ');
          const last_name = rest.join(' ');
          setForm({ ...data, first_name, last_name });
        } catch (err) {
          alert('Failed to load lead');
        }
      })();
    }
  }, [id, editing]);

  const handle = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: `${form.first_name} ${form.last_name}`,
        email: form.email,
        phone: Number(form.phone),
        company: form.company,
        city: form.city,
        state: form.state,
        source: form.source,
        status: form.status,
        score: form.score,
        lead_value: form.lead_value,
        is_qualified: form.is_qualified,
        last_activity_at: form.last_activity_at
      };

      if (editing) await updateLead(id, payload);
      else await createLead(payload);

      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="form-container">
      <h2>{editing ? 'Edit Lead' : 'New Lead'}</h2>
      <form onSubmit={handle} className="lead-form">
        <input
          className="form-input"
          placeholder="First name"
          value={form.first_name}
          onChange={e => setForm({ ...form, first_name: e.target.value })}
          required
        />

        <input
          className="form-input"
          placeholder="Last name"
          value={form.last_name}
          onChange={e => setForm({ ...form, last_name: e.target.value })}
          required
        />

        <input
          className="form-input"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="form-input"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          className="form-input"
          placeholder="Company"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="City"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="State"
          value={form.state}
          onChange={e => setForm({ ...form, state: e.target.value })}
        />

        <label>Source</label>
        <select
          className="form-select"
          value={form.source}
          onChange={e => setForm({ ...form, source: e.target.value })}
        >
          <option value="web">Website</option>
          <option value="referral">Referral</option>
          <option value="ads">Ads</option>
        </select>

        <label>Status</label>
        <select
          className="form-select"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
        </select>

        <input
          className="form-input"
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={e => setForm({ ...form, score: Number(e.target.value) })}
          min="0"
          max="100"
        />

        <input
          className="form-input"
          type="number"
          placeholder="Lead Value"
          value={form.lead_value}
          onChange={e => setForm({ ...form, lead_value: Number(e.target.value) })}
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.is_qualified}
            onChange={e => setForm({ ...form, is_qualified: e.target.checked })}
          /> Qualified
        </label>

        <button type="submit" className="form-button">Save</button>
      </form>
    </div>
  );
}
