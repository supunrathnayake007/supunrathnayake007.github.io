import { Link } from 'react-router-dom'
import ViewPosts from '../posts/viewPosts'

const Home = () => {
  return (
    <div className="">
      <div className="flex flex-wrap mx-10 my-10">
        <div className="w-full ">
          <div className="text-5xl font-bold flex flex-wrap ">
            <div className="w-full  my-2">Hi,</div>{' '}
            <div className="w-full  my-2">I'm Supun Rathnayaka,</div>
            <div className="w-full  my-2">Web developer</div>
          </div>
        </div>
        <div className="text-2xl my-2 font-serif ">
          Frontend Developer | ReactJs | Python | Video Editor
        </div>
        <div className="w-full mx-2">
          <Link to="/contact" className="">
            CONTACT ME
          </Link>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center w-full ">
          <ViewPosts />
        </div>
      </div>
    </div>
  )
}
export default Home
