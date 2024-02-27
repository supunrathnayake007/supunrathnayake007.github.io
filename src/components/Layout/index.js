//import './index.scss'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-wrap ">
      <div className="z-50 w-full sm:w-20 ">
        <Sidebar />
      </div>
      <div className="2xl:flex 2xl:justify-center">
        <div className="sm:pl-18 w-full 2xl:w-2/3 4xl:w-1/2 ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default Layout
