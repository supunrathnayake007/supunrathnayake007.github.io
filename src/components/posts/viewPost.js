import React from 'react'
import { useState, useEffect } from 'react'

export default function ViewPost(props) {
  const [post, setPost] = useState({})

  useEffect(() => {
    setPost(props.post)
  }, [props.post])

  return (
    <div className="flex flex-col bg-slate-400 opacity-90 m-0.5 rounded-md mb-2">
      <div className="text-4xl mt-3 mx-10 font-bold ">{post.title}</div>
      <div className="sm:flex mx-4 mb-4 mt-2 bg-slate-500  rounded text-white">
        <div className="mx-2 sm:w-64 ">
          <img
            className="m-2 p-1 justify-start align-top xxxs:justify-center xxxs:w-full "
            src={'data:image/png;base64,' + post.image}
            alt="Post"
            onError={(e) => {
              e.target.src = '/error_cloud_icon.svg' // Replace with a fallback image URL
            }}
          />
        </div>
        <div className="w-full m-2 text-justify">{post.desc}</div>
      </div>
    </div>
  )
}
