//import './index.scss'
//import './index2.scss'
import { Link, NavLink } from 'react-router-dom'
import Sr_logo from '../../assets/images/sr_logo.png'
import Sr_logo_sub from '../../assets/images/sr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import {
  faAndroid,
  faFacebook,
  faGithub,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => {
  const location = useLocation()
  return (
    <div className="w-full">
      <div className=" sm:fixed bg-slate-800 w-full sm:w-16 sm:h-full ">
        <div className="inline-block w-12 m-1">
          <Link className="logo" to="/">
            <img src={Sr_logo} alt="logo" />
            <img className="sub-logo" src={Sr_logo_sub} alt="logo_sub" />
          </Link>
        </div>

        <div className="absolute left-1/3 top-1 w-80 h-20 sm:absolute sm:w-full sm:top-1/3 sm:left-0 text-4xl ">
          <nav className="flex sm:block  m-1 pr-2">
            <div className=" w-1/4 sm:w-full sm:flex sm:justify-center p-1 m-1 ">
              <NavLink
                to="/"
                className="object-fill text-red -600 hover:text-yellow-300 "
              >
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faHome}
                  color={location.pathname === '/' ? '#FFD700' : '#4d4d4e'}
                />
              </NavLink>
            </div>
            <div className=" w-1/4 sm:w-full sm:flex sm:justify-center m-1 p-1  ">
              <NavLink to="/about" className="about-link">
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faUser}
                  color={location.pathname === '/about' ? '#FFD700' : '#4d4d4e'}
                />
              </NavLink>
            </div>
            <div className="w-1/4 sm:w-full sm:flex sm:justify-center m-1 p-1  ">
              <NavLink to="/contact" className="contact-link">
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faEnvelope}
                  color={
                    location.pathname === '/contact' ? '#FFD700' : '#4d4d4e'
                  }
                />
              </NavLink>
            </div>
            <div className="w-1/4 sm:w-full sm:flex sm:justify-center m-1 p-1  ">
              <NavLink className="object-fill" to="/projects">
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faAndroid}
                  color={
                    location.pathname === '/projects' ? '#FFD700' : '#4d4d4e'
                  }
                />
              </NavLink>
            </div>
          </nav>
        </div>
        <div className="absolute right-1   sm:absolute   sm:h-40 sm:left-1 sm:bottom-1 text-2xl    ">
          <ul className="p-1 flex justify-center sm:block">
            <li className="m-1">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/supun-rathnayaka"
              >
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faLinkedin}
                  color="#4d4d4e"
                />
              </a>
            </li>
            <li className="m-1">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/supunrathnayake007"
              >
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faGithub}
                  color="#4d4d4e"
                />
              </a>
            </li>
            <li className="m-1">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/channel/UCresGeGTlG3LR0WfVZ1rt_g"
              >
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faYoutube}
                  color="#4d4d4e"
                />
              </a>
            </li>
            <li className="m-1">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://web.facebook.com/profile.php?id=100012260057356"
              >
                <FontAwesomeIcon
                  className="hover:text-yellow-300 "
                  icon={faFacebook}
                  color="#4d4d4e"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Sidebar
