// App.js
import './App.css';
import { RouterProvider } from "react-router-dom";
import router from './router';
import { Suspense } from 'react';
import './styles/tailwind.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
