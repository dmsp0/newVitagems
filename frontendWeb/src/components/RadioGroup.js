import React from 'react';

const RadioGroup = ({ label, options, selectedValue, onChange }) => (
  <div className="flex items-center space-x-4 mb-4">
    <label className="w-1/4 text-gray-600">{label}</label>
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option} className="flex items-center">
          <input
            type="radio"
            value={option}
            checked={selectedValue === option}
            onChange={onChange}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroup;
