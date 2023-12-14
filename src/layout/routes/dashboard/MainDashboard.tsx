import React from 'react'
import Header from '../../main/headers/Header'
import Sidebar from '../../main/sidebars/Sidebar'
import { Outlet } from 'react-router-dom'

const MainDashboard = () => {
    const token = localStorage.getItem("token")


  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
      {/* <Footers /> */}
    </div>
  )
}

export default MainDashboard