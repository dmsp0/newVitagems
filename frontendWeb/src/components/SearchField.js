
import React from 'react';

const SearchField = ({ value, onChange, searchTitle, searchPlaceholder }) => {
    return (
        <div className="flex items-center">
            <label className="block mx-2 text-gray-700">{searchTitle}</label>
            <input 
                type="text"
                value={value}
                onChange={onChange}
                className="mt-1 block w-40 border border-gray-300 rounded-md p-2"
                placeholder={searchPlaceholder}
            />
        </div>
    );
};

export default SearchField;
