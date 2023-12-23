import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sudoku_logo from './assets/sudoku.png'
import './index.scss'

const Projects = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    LoadAllProject()
  }, [])
  async function LoadAllProject() {
    debugger
    try {
      const res = await fetch(
        'https://social-media-clone-mauve.vercel.app/api/forPortfolioSite/getAllProjects'
      )
      if (!res.ok) {
        throw new Error('Network response was not ok.')
      }
      const responseData = await res.json()
      setData(responseData.result)
      console.log('Response data:', responseData)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 ">
      <div className="flex flex-wrap text-white">
        {data
          ? data.map((project, index) => (
              <div
                key={index}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
              >
                <ProjectCard key={index} project={project} />
              </div>
            ))
          : ''}
      </div>
    </div>
  )
}
export default Projects

const ProjectCard = (props) => {
  const openNewPage = () => {
    // props.openNewPage(props.project);
  }

  return (
    <div className="hover:border-2 border-sky-500  p-1">
      <div>
        <a href={props.project.url} target="_blank" rel="noopener noreferrer">
          <img
            className="w-80"
            src={'data:image/png;base64,' + props.project.image}
            alt={props.project.title}
            onError={(e) => {
              e.target.src = '/error_cloud_icon.svg' // Replace with a fallback image URL
            }}
          />
        </a>
      </div>
      <div>{props.project.title}</div>
      <div className="text-gray-400">
        {<>{`${props.project.desc.slice(0, 50)}... `}</>}
        {
          <button
            onClick={openNewPage}
            className="text-blue-500 hover:underline focus:outline-none ml-2"
            disabled
          >
            View Details
          </button>
        }
      </div>
      <div>{props.project.selectedTechs}</div>
    </div>
  )
}
