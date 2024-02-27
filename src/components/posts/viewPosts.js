import React from 'react'
import { useEffect, useState, useRef } from 'react'
import ViewPost from './viewPost'
import axios from 'axios'
import HashLoaderC from '../loaders/HashLoaderC'
const apiUrl = process.env.REACT_APP_API_URL

export default function ViewPosts() {
  const dataPerPage = 2
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [noMorePosts, setNoMorePosts] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    //loadPosts(1);
    // debugger
  }, [])

  const loadPosts = async (pageNumber) => {
    try {
      //debugger
      const res = await axios.post(apiUrl + 'api/posts/viewPosts', {
        action: 'loadPosts',
        dataPerPage,
        pageNumber,
        loadedDataCount: posts.length,
      })
      const responseData = res.data
      setNoMorePosts(responseData.noMorePosts)
      setPosts((prevPosts) => [...prevPosts, ...responseData.posts])
      setPageNumber((prevPageNumber) => prevPageNumber + 1)
    } catch (error) {
      console.log('viewPost.js|loadSampleData|error:' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('loaderRef.current:' + loaderRef.current)
    //debugger;
    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !loading && !noMorePosts) {
            setLoading(true)
            await loadPosts(pageNumber)
          }
        }
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0, // Trigger the observer as soon as any part of the target is visible
      }
    )
    const currentRef = loaderRef.current
    if (loaderRef.current) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [loaderRef.current, loading, noMorePosts, pageNumber])

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <ViewPost post={post} />
        </div>
      ))}

      {loading && (
        <div className=" w-full bg-slate-500 p-0.5  rounded-lg m-0.5">
          <div className="flex justify-center">
            <HashLoaderC />
          </div>
        </div>
      )}
      <div className="flex justify-center border" ref={loaderRef}>
        ooo
      </div>
    </div>
  )
}
