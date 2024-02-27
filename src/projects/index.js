import { useState, useEffect } from 'react'
//import './index.scss'
const apiUrl = process.env.REACT_APP_API_URL

const Projects = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    LoadAllProject()
  }, [])
  async function LoadAllProject() {
    //debugger
    try {
      const res = await fetch(apiUrl + 'api/forPortfolioSite/getAllProjects')
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
    <div className="w-full  my-10 ">
      <div className="flex flex-wrap ">
        {data
          ? data.map((project, index) => (
              <div
                key={index}
                className="w-1/3 sm:w-1/3 xxs:w-1/3 xxxs:w-auto md:w-1/3 lg:w-1/4 xl:w-1/6 "
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
    <div className="hover:border-2 border-sky-500 m-1 text-xs bg-slate-300 rounded p-2 ">
      <div className="flex justify-center">
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
      <div className="whitespace-normal text-[0.5rem]">
        <p>{props.project.selectedTechs}</p>
      </div>
    </div>
  )
}
