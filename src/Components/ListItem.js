import React from 'react'
import { useState } from 'react'


const ListItem = ({ data, ref }) => {
   const [userInfo, setUserInfo] = useState("")
   console.log("userInfo >>", userInfo);

   return (
      <div className="listItem" ref={ref} onClick={() => setUserInfo(data.login)}>{data.login}</div>
   )
}

export default ListItem