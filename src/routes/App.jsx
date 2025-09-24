import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import CreateTask from '../pages/CreateTask.jsx';


import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<CreateTask />} />
        <Route path="*" element={<p>Pagina no encontrada</p>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App