// import React, { useState } from "react";

// const LoginModal = ({ isOpen, closeModal }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("아이디:", username);
//     console.log("비밀번호:", password);
//     closeModal();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
//         {/* 헤더 */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800">로그인</h2>
//           <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
//             &times;
//           </button>
//         </div>

//         {/* 폼 */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* 아이디 입력 */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               아이디
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               placeholder="아이디를 입력하세요"
//             />
//           </div>

//           {/* 비밀번호 입력 */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               비밀번호
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               placeholder="비밀번호를 입력하세요"
//             />
//           </div>

//           {/* 로그인 버튼 */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//           >
//             로그인
//           </button>
//         </form>

//         {/* 하단 설명 */}
//         <div className="mt-4 text-center text-gray-600 text-sm">
//           <p>계정이 없으신가요? <a href="/signup" className="text-blue-500 hover:text-blue-700">회원가입</a></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;
