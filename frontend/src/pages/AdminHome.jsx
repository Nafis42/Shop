import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/Admin/SideBar';

function AdminHome() {
  return (
    <div className="flex min-h-screen">
    <SideBar />
    <div className="flex-1 p-4">
        <Outlet /> {/* This will render the child route components */}
    </div>
    </div>
  )
}

export default AdminHome
