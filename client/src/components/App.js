import React, { useEffect, useState } from 'react';
import './App.css';
import AuditForm from './AuditForm';
import AuditTable from './AuditTable';
import AuditSummary from './AuditSummary';

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

  const fetchAudits = async () => {
    const response = await fetch('http://localhost:5555/audits');
    if (response.ok) {
      const fetchedAudits = await response.json();
      setAudits(fetchedAudits);
    }
  };

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

  const saveEdit = async (event, auditId) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5555/audits/${auditId}`, {
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
      await fetchAudits();
    }
  };

  const addAudit = async (event) => {
    event.preventDefault();
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
      await fetchAudits();
    }
  };

  const deleteAudit = async (auditId) => {
    const response = await fetch(`http://localhost:5555/audits/${auditId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      await fetchAudits();
    }
  };



  return (
    <div className="App">
      <h1>Audits</h1>
      <AuditSummary audits={audits} />
      <AuditForm
        newAudit={newAudit}
        handleInputChange={handleInputChange}
        addAudit={addAudit}
      />
      <AuditTable
        audits={audits}
        editingId={editingId}
        startEditing={startEditing}
        saveEdit={saveEdit}
        editFormData={editFormData}
        handleEditFormChange={handleEditFormChange}
        deleteAudit={deleteAudit}
        setEditingId={setEditingId} // Pass setEditingId as a prop
      />
    </div>
  );
}

export default App;


