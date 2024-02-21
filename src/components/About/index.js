import { useEffect, useState } from 'react'
import {
  faAngular,
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setLetterClass('text-animate-hover')
      }, 3000)
    }
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="flex flex-wrap">
          <div className="w-full my-10">
            <div className="text-zone">
              <div className="mb-8 text-6xl underline">
                <AnimatedLetters
                  letterClass={letterClass}
                  strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
                  idx={15}
                />
              </div>
              <div className="lg:text-xl">
                <p>
                  I'm a very ambitious front-end developer looking for a role in
                  an established IT company with the opportunity to work with
                  the latest technologies on challenging and diverse projects.
                </p>
                <p align="LEFT">
                  I'm quiet confident, naturally curious, and perpetually
                  working on improving my chops one design problem at a time.
                </p>
                <p>
                  If I need to define myself in one sentence that would be a
                  family person, photography enthusiast, and tech-obsessed!!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
