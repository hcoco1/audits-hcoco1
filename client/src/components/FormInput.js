import React from 'react';

function FormInput({ label, type, value, onChange, id, required = false }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      />
    </div>
  );
}

export default FormInput;
