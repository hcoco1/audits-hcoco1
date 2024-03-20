import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [audits, setAudits] = useState([]);
  const [newAudit, setNewAudit] = useState({
    username: '',
    afe: '',
    processPath: '',
    error: '',
    durable: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    afe: '',
    processPath: '',
    error: '',
    durable: ''
  });

 // Define fetchAudits outside useEffect but inside App component
 const fetchAudits = async () => {
  const response = await fetch('http://localhost:5555/audits');
  if (response.ok) {
    const fetchedAudits = await response.json();
    setAudits(fetchedAudits);
  }
};

// Use useEffect to call fetchAudits when the component mounts
useEffect(() => {
  fetchAudits();
}, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAudit({ ...newAudit, [name]: value });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const startEditing = (audit) => {
    setEditingId(audit.id);
    setEditFormData(audit);
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    // Assume updateAudit sends the updated audit details to the backend
    const response = await fetch(`http://localhost:5555/audits/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData)
    });
    if (response.ok) {
      setEditingId(null);
      setEditFormData({
        username: '',
        afe: '',
        processPath: '',
        error: '',
        durable: ''
      });
      // Refresh the audits list after editing
      await fetchAudits();
    }
  };

  const addAudit = async (event) => {
    event.preventDefault();
    // Assume addAudit sends the new audit details to the backend
    const response = await fetch('http://localhost:5555/audits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAudit)
    });
    if (response.ok) {
      setNewAudit({
        username: '',
        afe: '',
        processPath: '',
        error: '',
        durable: ''
      });
      // Refresh the audits list after adding
      await fetchAudits();
    }
  };

  const deleteAudit = async (auditId) => {
    // Assume deleteAudit removes the audit from the backend
    const response = await fetch(`http://localhost:5555/audits/${auditId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      // Refresh the audits list after deleting
      await fetchAudits();
    }
  };
  
  return (
    <div className="App">
      <h1>Audits</h1>
      <form onSubmit={addAudit}>
        <div className="form-row">
          <input
            name="username"
            placeholder="Username"
            value={newAudit.username}
            onChange={e => setNewAudit({ ...newAudit, username: e.target.value })}
          />
  
          <select
            name="afe"
            value={newAudit.afe}
            onChange={e => setNewAudit({ ...newAudit, afe: e.target.value })}
          >
            <option value="">AFE</option>
            <option value="AFE1">AFE1</option>
            <option value="AFE2">AFE2</option>
          </select>
  
          <select
            name="processPath"
            value={newAudit.processPath}
            onChange={e => setNewAudit({ ...newAudit, processPath: e.target.value })}
          >
            <option value="">Process</option>
            <option value="Pack">Pack</option>
            <option value="Induct">Induct</option>
            <option value="Rebin">Rebin</option>
            <option value="Pack-other">Pack-other</option>
            <option value="Smartpac">Smartpac</option>
          </select>
  
          <select
            name="error"
            value={newAudit.error}
            onChange={e => setNewAudit({ ...newAudit, error: e.target.value })}
          >
            <option value="">Error</option>
            <option value="Error Indicator">Error Indicator</option>
            <option value="Shortage">Shortage</option>
            <option value="Wrong Box">Wrong Box</option>
            <option value="Slam Kickout">Slam Kickout</option>
            <option value="Missing Item">Missing Item</option>
            <option value="Damaged">Damaged</option>
            <option value="Unscannable">Unscannable</option>
          </select>
  
          <textarea
            name="durable"
            placeholder="Audit"
            value={newAudit.durable}
            onChange={e => setNewAudit({ ...newAudit, durable: e.target.value })}
            rows="2"
          />
        </div>
  
        <button type="submit">Add Audit</button>
      </form>
  
      <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>AFE</th>
          <th>Process Path</th>
          <th>Error</th>
          <th>Durable</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {audits.map(audit => (
          <tr key={audit.id}>
            {editingId === audit.id ? (
              <td colSpan="6">
                <form onSubmit={(e) => saveEdit(e, audit.id)}>
                  {/* Edit form fields with Save and Cancel buttons */}
                  <input
                    name="username"
                    placeholder="Username"
                    value={editFormData.username}
                    onChange={handleEditFormChange}
                  />
                  {/* Additional inputs/selects for editing */}
                  <textarea
                    name="durable"
                    placeholder="Audit Details"
                    value={editFormData.durable}
                    onChange={handleEditFormChange}
                    rows="2"
                  />
                  <button type="submit">Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </form>
              </td>
            ) : (
              <>
                <td>{audit.username}</td>
                <td>{audit.afe}</td>
                <td>{audit.processPath}</td>
                <td>{audit.error}</td>
                <td>{audit.durable}</td>
                <td>
                  <button onClick={() => startEditing(audit)}>Edit</button>
                  <button onClick={() => deleteAudit(audit.id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
  
}

export default App;

