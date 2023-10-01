import './index.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          Hi,
          <br />
          I'm Supun Rathnayaka,
          <br />
          Web developer
        </h1>
        <h2>Frontend Developer | ReactJs | Python | Video Editor</h2>
        <Link to="/contact" className="flat-button">
          CONTACT ME
        </Link>
      </div>
    </div>
  )
}
export default Home
