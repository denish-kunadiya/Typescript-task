import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'


interface Props {
  
  userListFromRedux:{
    id: string
mobile: string
primary: string
shortName: string
  }[]
 
}
const UserDetailForm:React.FC<Props> = ({userListFromRedux}) => {
  const [data, setData] = useState(userListFromRedux)

  useEffect(() => {
    setData(userListFromRedux)
  }, [userListFromRedux])
  
  return (
    <div className='d-flex flex-column justify-content-center mt-5 px-5'>
      <h4>Contact List</h4>
      <ListGroup>
      {data?.map((item:any,i:any)=>(
        <ListGroup.Item key={i}>
          <div>Mobile Number :<span>{item?.mobile}</span></div>
          <div>Country : <span>{item?.primary}</span></div>
          <div>Short Name: <span>{item?.shortName}</span></div>
        
        </ListGroup.Item>
      ))}
      
    </ListGroup>
    </div>
  )
}

export default UserDetailForm