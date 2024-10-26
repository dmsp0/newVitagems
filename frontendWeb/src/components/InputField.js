import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder, disabled }) => (
  <div className="flex items-center space-x-4 mb-4">
    <label className="w-1/4 text-gray-600">{label}</label>
    <input
      type={type}
      name={name} // name 속성 추가
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled} // disabled 속성 추가
      className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
    />
  </div>
);

export default InputField;
