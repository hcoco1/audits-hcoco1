// AuditForm.js
function AuditForm({ auditData, handleChange, handleSubmit, cancelEdit }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <input
                    name="username"
                    placeholder="Username"
                    value={auditData.username}
                    onChange={handleChange}
                />
                <select name="afe" value={auditData.afe} onChange={handleChange}>
                    <option value="">AFE</option>
                    
                    <option value="AFE1">AFE1</option>
                    <option value="AFE2">AFE2</option>
                </select>
                <select name="processPath" value={auditData.processPath} onChange={handleChange}>
                    <option value="">Process</option>
                    
                    <option value="Pack">Pack</option>
                    <option value="Induct">Induct</option>
                    <option value="Rebin">Rebin</option>
                    <option value="Pack-other">Pack-other</option>
                    <option value="Smartpac">Smartpac</option>
                </select>
                <select name="error" value={auditData.error} onChange={handleChange}>
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
                    placeholder="Durable"
                    value={auditData.durable}
                    onChange={handleChange}
                    rows="2"
                />
            </div>
            <button type="submit">Add Audit</button>
            {cancelEdit && <button type="button" onClick={cancelEdit}>Cancel</button>}
        </form>
    );
}

export default AuditForm;

