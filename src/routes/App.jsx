import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-task" element={<HomePage />} />
        <Route path="*" element={<p>Pagina no encontrada</p>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App