import './App.scss'

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import Projects from './projects'
import SudokuRoot from './projects/Sudoku'
import { Helmet } from 'react-helmet'

function App() {
  return (
    <div className="">
      <Helmet>
        <meta name="description" content="Hi, I'm Supun Rathnayake" />
        <meta
          name="keywords"
          content="Supun Rathnayake Portfolio,Supun,Rathnayake"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sudoku" element={<SudokuRoot />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
