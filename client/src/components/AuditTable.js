// AuditTable.js
import React from 'react';
import AuditTableRow from './AuditTableRow';

function AuditTable({ audits, isEditingId, handleEditFormChange, startEditing, saveEdit, cancelEdit, deleteAudit }) {
  return (
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
        {audits.map((audit) => (
          <AuditTableRow
            key={audit.id}
            audit={audit}
            isEditing={isEditingId === audit.id}
            handleEditFormChange={handleEditFormChange}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            deleteAudit={deleteAudit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AuditTable;
