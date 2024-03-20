// AuditTableRow.js
import React from 'react';

function AuditTableRow({ audit, editingId, startEditing, saveEdit, editFormData, handleEditFormChange, deleteAudit, setEditingId }) {
  return (
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

            <select
          name="afe"
          value={editFormData.afe}
          onChange={handleEditFormChange}
        >
          <option value="">AFE</option>
          <option value="AFE1">AFE1</option>
          <option value="AFE2">AFE2</option>
        </select>

        <select
          name="processPath"
          value={editFormData.processPath}
          onChange={handleEditFormChange}
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
          value={editFormData.error}
          onChange={handleEditFormChange}
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
  );
}

export default AuditTableRow;

