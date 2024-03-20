// src/components/AuditorNameForm.js
import React, { useState } from 'react';

function AuditorNameForm({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameSubmit(name);
    setName(''); // Reset the input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="auditorName">Auditor's Name:</label>
      <input
        id="auditorName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Set Name</button>
    </form>
  );
}

export default AuditorNameForm;


