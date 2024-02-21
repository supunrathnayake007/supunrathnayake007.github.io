//import './index.scss'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-wrap ">
      <div className="z-50 w-full sm:w-20 ">
        <Sidebar />
      </div>
      <div className="sm:w-5/6 w-full">
        <Outlet />
      </div>
    </div>
  )
}
export default Layout
