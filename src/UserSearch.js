import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [gitApi, setGitApi] = useState([])
  const [hasMore, setHasMore] = useState(false)
  useEffect(() => {
    setGitApi([])
  }, [query])
  useEffect(() => {

    const getData = () => {
      setLoading(true)
      setError(false)
      let cancel
      setTimeout(() => {
        axios({
          method: 'GET',
          url: 'https://api.github.com/search/users',
          params: { q: query, page: pageNumber, per_page: 100 },
          cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
          setGitApi(res.data.items)
          setHasMore(res.data.items.length > 0)
          setLoading(false)
        }).catch(e => {
          if (axios.isCancel(e)) return
          // setError(true)
        })
        return () => cancel()

      }, 1000)
    }
    query !== "" && getData()
  }, [query, pageNumber])


  return { loading, error, gitApi, hasMore }
}
