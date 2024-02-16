import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const commonInput = 'm-1 p-1 w-full px-3 py-2 border rounded-md '

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setLetterClass('text-animate-hover')
      }, 3000)
    }
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_d5aeot9',
        'template_z8w06q8',
        form.current,
        '6d9NNvibgSbmHaAHZ'
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
      <div className="xxxs:mt-32 pr-40">
        <div className="flex flex-wrap xs:pr-20">
          <div className="lg:w-1/2 xxs:w-full">
            <div className="mb-4 text-5xl">Hi, I'm Supun Rathnayake</div>

            <p className="text-xl">
              I am interested in freelance opportunities - especially on
              ambitious or large projects. However, if you have any other
              requests or questions, don't hesitate to contact me using below
              form either.
            </p>
            <div className="pl-2 mb-2 text-4xl">Contact Me</div>
          </div>
          <div className="lg:w-2/3 xxs:w-full text-xl">
            <form ref={form} onSubmit={sendEmail}>
              <div className="flex flex-wrap">
                <div className={'w-1/2 '}>
                  <input
                    className={commonInput}
                    placeholder="Name"
                    type="text"
                    name="name"
                    required
                  />
                </div>
                <div className={'w-1/2 pl-2'}>
                  <input
                    className={commonInput}
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    className={commonInput}
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </div>
                <div className="w-full">
                  <textarea
                    rows="4"
                    className="block m-1 p-1 w-full px-3 py-2 border rounded-lg"
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div className="w-full">
                  <div className="">
                    <div className="float-right lg:w-1/4 sm:w-1/3 xxxs:w-full">
                      <input
                        type="submit"
                        className="w-full m-1 p-1 px-3 bg-lime-500 rounded hover:bg-lime-600  text-white "
                        value="Send"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="info-map">
          Slobodan Gajić,
          <br />
          Serbia,
          <br />
          Branka RadiČevića 19, 22000 <br />
          Sremska Mitrovica <br />
          <br />
          <span>freelancerslobodan@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[44.96366, 19.61045]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[44.96366, 19.61045]}>
              <Popup>Sloba lives here, come over for a cup of coffee :)</Popup>
            </Marker>
          </MapContainer>
        </div> */}
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
