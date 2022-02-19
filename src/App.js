import React, { useState, useRef, useCallback, useEffect } from 'react'
import UserSearch from './UserSearch'
import "./app.css"
import { useDispatch } from "react-redux";
import { changeColor } from "./features/theme";
import { Link } from "react-router-dom"


export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [userInfo, setUserInfo] = useState("")

  const {
    gitApi,
    hasMore,
    loading,
    error
  } = UserSearch(query, pageNumber)

  const observer = useRef()


  const lastgitElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }
  return (
    <><input type="text" value={query} onChange={handleSearch} />
      {gitApi.map((git, index) => {
        if (gitApi.length === index + 1) {
          return <div className="listItem" key={index} ref={lastgitElementRef} >
            <Link to="/userId" state={git}>{git.login}</Link>
          </div>
        } else {
          return <div className="listItem" key={index} ref={lastgitElementRef} ><Link to="/userId" state={git}>{git.login}</Link></div>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>

    </>
  )
}

