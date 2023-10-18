import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import Sr_logo from '../../assets/images/sr_logo.png'
import Sr_logo_sub from '../../assets/images/sr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import {
  faAndroid,
  faFacebook,
  faGithub,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => (
  <div className="nav-bar">
    <Link className="logo" to="/">
      <img src={Sr_logo} alt="logo" />
      <img className="sub-logo" src={Sr_logo_sub} alt="logo_sub" />
    </Link>

    <nav>
      <NavLink exact="true" activeclassname="active" to="/">
        <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        to="/about"
        className="about-link"
      >
        <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        to="/contact"
        className="contact-link"
      >
        <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
      </NavLink>
      <NavLink
        exact="true"
        activeclassname="active"
        to="/projects"
        className="projects-link"
      >
        <FontAwesomeIcon icon={faAndroid} color="#4d4d4e" />
      </NavLink>
    </nav>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/supun-rathnayaka"
        >
          <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/supunrathnayake007"
        >
          <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/channel/UCresGeGTlG3LR0WfVZ1rt_g"
        >
          <FontAwesomeIcon icon={faYoutube} color="#4d4d4e" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://web.facebook.com/profile.php?id=100012260057356"
        >
          <FontAwesomeIcon icon={faFacebook} color="#4d4d4e" />
        </a>
      </li>
    </ul>
  </div>
)
export default Sidebar
