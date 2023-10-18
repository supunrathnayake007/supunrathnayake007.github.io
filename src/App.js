import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Projects from './projects'
import SudokuRoot from './projects/Sudoku'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sudoku" element={<SudokuRoot />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
