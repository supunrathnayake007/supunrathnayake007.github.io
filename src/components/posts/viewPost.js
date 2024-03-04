import React from 'react'
import { useState, useEffect } from 'react'

export default function ViewPost(props) {
  const [post, setPost] = useState({})

  useEffect(() => {
    setPost(props.post)
  }, [props.post])

  return (
    <div className="flex flex-col bg-slate-400 opacity-90 m-0.5 rounded-md mb-2 mr-3">
      <div className="text-4xl mt-3 mx-10 font-bold ">{post.title}</div>
      <div className="sm:flex mx-4 mb-4 mt-2 pr-2 bg-slate-500  rounded text-white border-2">
        <div className="mx-2 sm:w-64 rounded-md ">
          <img
            className=" m-2 justify-start align-top xxxs:justify-center xxxs:w-full rounded-md border-2"
            src={'data:image/png;base64,' + post.image}
            alt="Post"
            onError={(e) => {
              e.target.src = '/error_cloud_icon.svg' // Replace with a fallback image URL
            }}
          />
        </div>
        <div
          className="w-full m-1 p-2 text-justify rounded-md my-2"
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />
      </div>
    </div>
  )
}
