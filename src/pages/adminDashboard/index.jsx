import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchUserList } from '../../redux/slicers/userListSlice';



const AdminDashboard = () => {

  const dispatch = useDispatch()
  
  
  useEffect(() => {
    dispatch(fetchUserList())
  },[dispatch])

  return (
    <div>AdminDashboard</div>
  )
}


export default AdminDashboard;