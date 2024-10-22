import React from 'react';
import { useNavigate } from 'react-router-dom';

const Table = ({ tableName, headers, data, onRowClick, clickableField, firstPath }) => {
    const navigate = useNavigate();

    const handleRowClick = (item) => {
        if (clickableField) {
            navigate(`/${firstPath}/${item[clickableField]}`); // 클릭 가능한 필드에 따라 URL 경로 설정
        }
        onRowClick && onRowClick(item); // 추가적인 클릭 핸들러가 있을 경우 호출
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">{tableName}</h1>

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
                <thead className="bg-gray-200">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="py-2 px-4 border-b">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)} className="cursor-pointer hover:bg-blue-100">
                            {Object.values(item).map((value, idx) => (
                                <td key={idx} className="py-2 px-4 border-b">{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
