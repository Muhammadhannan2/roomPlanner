import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import MiniDrawer from './pages/Planner';
import ThreeDScene from './components/ThreeDScene';
import Data from './context/Data';


const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

function Root() {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/planner" element={<MiniDrawer />} />
      <Route path="/scene" element={<ThreeDScene />} />
    </Routes>
  );
}


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Data>
  <RouterProvider router={router} />
  </Data>
  )
}

export default App
