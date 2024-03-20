// AuditForm.js
import React from 'react';

function AuditForm({ newAudit, handleInputChange, addAudit }) {
  return (
    <form onSubmit={addAudit}>
      <div className="form-row">
        <input
          name="username"
          placeholder="Username"
          value={newAudit.username}
          onChange={handleInputChange}
        />

        <select
          name="afe"
          value={newAudit.afe}
          onChange={handleInputChange}
        >
          <option value="">AFE</option>
          <option value="AFE1">AFE1</option>
          <option value="AFE2">AFE2</option>
        </select>

        <select
          name="processPath"
          value={newAudit.processPath}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          rows="2"
        />
      </div>

      <button type="submit">Add Audit</button>
    </form>
  );
}

export default AuditForm;
