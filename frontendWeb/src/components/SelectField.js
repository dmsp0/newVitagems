import React from 'react';

const SelectField = ({ label, value, options, onChange }) => (
  <div className="flex items-center space-x-4 mx-2">
    <label className="w-2/4 text-gray-600">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
