// AuditTableRow.js
import React from 'react';
import AuditForm from './AuditForm';

function AuditTableRow({ audit, isEditing, handleEditFormChange, startEditing, saveEdit, cancelEdit, deleteAudit }) {
  return (
    <tr>
      {isEditing ? (
        <AuditForm
          auditData={audit}
          handleChange={handleEditFormChange}
          handleSubmit={(e) => saveEdit(e, audit.id)}
          cancelEdit={() => cancelEdit()}
        />
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
