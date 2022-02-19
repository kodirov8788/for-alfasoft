import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { changeColor } from "../features/theme";
import { useLocation } from "react-router-dom"
const UserInfo = () => {
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)
   const [repo, setRepo] = useState([])
   const [repoData, setRepoData] = useState()
   const [hasMore, setHasMore] = useState(false)
   const [userLogin, setUserLogin] = useState('')
   const [pageNumber, setPageNumber] = useState(1);
   const location = useLocation()
   const observer = useRef()
   useEffect(() => {
      fetch(`${location.state.repos_url}`)
         .then(response => response.json())
         .then(data => {
            setRepo(data)
         })
         .catch(function (error) {
            console.log(error);
         });
   }, [])

   useEffect(() => {

      setLoading(true)
      setError(false)
      let cancel
      setTimeout(() => {
         axios({
            method: 'GET',
            url: `${location.state.repos_url}`,
            params: { page: pageNumber, per_page: 10 },
            cancelToken: new axios.CancelToken(c => cancel = c)
         }).then(res => {
            setRepo(res.data)
            setHasMore(res.data.length > 0)
            setLoading(false)
         }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            console.log("e>>", e);
         })
         return () => cancel()

      }, 1000)
   }, [userLogin, pageNumber])

   useEffect(() => {
      const getuserId = () => {
         dispatch(changeColor(location.state.login));
         setUserLogin(location.state.login)
      }
      getuserId()
   }, [])

   useEffect(() => {
      localStorage.setItem("kodirov__box", JSON.stringify(location.state.login));
   }, [location.state.login]);

   const kodirov__box = JSON.parse(
      localStorage.getItem("kodirov__box")
   );
   console.log("kodirov__box >>", kodirov__box);
   const lastrepoDataItemElementRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1)
         }
      })
      if (node) observer.current.observe(node)
   }, [loading, hasMore])

   return (
      <div className="">
         <h1>state is : {location.state.login}</h1>
         {repo.map((repoDataItem, index) => {
            if (repo.length === index + 1) {
               return <div className="listItem" key={index} ref={lastrepoDataItemElementRef} onClick={() => setRepoData(repoDataItem.name)}>
                  <h1 to="/userId" state={repoDataItem}>{repoDataItem.name}</h1>
               </div>
            } else {
               return <div className="listItem" key={index} ref={lastrepoDataItemElementRef} onClick={() => setRepoData(repoDataItem.name)}><h1 to="/userId" state={repoDataItem}>{repoDataItem.name}</h1></div>
            }
         })}
         <div>{loading && 'Loading...'}</div>
      </div>
   )
}

export default UserInfo