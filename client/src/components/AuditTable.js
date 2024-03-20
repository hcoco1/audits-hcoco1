// AuditTable.js
import React from 'react';
import AuditTableRow from './AuditTableRow'; // Update this import statement

function AuditTable({ audits, editingId, startEditing, saveEdit, editFormData, handleEditFormChange, deleteAudit, setEditingId }) {
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
                {audits.map(audit => (
                    <AuditTableRow
                        key={audit.id}
                        audit={audit}
                        editingId={editingId}
                        startEditing={startEditing}
                        saveEdit={saveEdit}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        deleteAudit={deleteAudit}
                        setEditingId={setEditingId} // Pass setEditingId as a prop
                    />


                ))}
            </tbody>
        </table>
    );
}

export default AuditTable;

