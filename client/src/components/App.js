import React, { useEffect, useState } from 'react';
import './App.css';
import AuditTable from './AuditTable';
import AuditForm from './AuditForm';
import AuditorNameForm from './AuditorNameForm';


function App() {
  const [auditorName, setAuditorName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAudit({ ...newAudit, [name]: value });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const startEditing = (audit) => {
    setEditingId(audit.id);
    setEditFormData(audit);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
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
      await fetchAudits();
    }
  };

  const addAudit = async (e) => {
    e.preventDefault();
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

  const handleNameSubmit = (submittedName) => {
    setAuditorName(submittedName);
    setIsEditingName(false); // Hide the form after submission
  };

  const editName = () => {
    setIsEditingName(true); // Show the form to edit the name
  };

  return (
    <div className="App">
      <h1>Audits</h1>
      {isEditingName || !auditorName ? (
        <AuditorNameForm onNameSubmit={handleNameSubmit} />
      ) : (
        <div>
          Auditor's Name: {auditorName}
          <button onClick={editName} style={{marginLeft: "10px"}}>Edit Name</button>
        </div>
      )}

      {editingId ? (
        <AuditForm
          auditData={editFormData}
          handleChange={handleEditFormChange}
          handleSubmit={saveEdit}
          isEditing={true}
        />
      ) : (
        <AuditForm
          auditData={newAudit}
          handleChange={handleInputChange}
          handleSubmit={addAudit}
          isEditing={false}
        />
      )}
      <AuditTable
        audits={audits}
        startEditing={startEditing}
        deleteAudit={deleteAudit}
        editingId={editingId}
        editFormData={editFormData}
        handleEditFormChange={handleEditFormChange}
        saveEdit={saveEdit}
      />
    </div>
  );
}

export default App;
