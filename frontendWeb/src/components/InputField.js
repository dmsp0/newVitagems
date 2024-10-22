import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div className="flex items-center space-x-4 mb-4">
    <label className="w-1/4 text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
    />
  </div>
);

export default InputField;
