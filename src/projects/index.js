import { Link } from 'react-router-dom'
import sudoku_logo from './assets/sudoku.png'
import './index.scss'

const Projects = () => {
  return (
    <div className="container">
      <div className="project-logo">
        <Link to="/sudoku">
          <img src={sudoku_logo} alt="sudokuLogo"></img>
        </Link>
      </div>
    </div>
  )
}
export default Projects