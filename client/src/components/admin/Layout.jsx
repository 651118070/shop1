import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './Header'
import AdminSidebar from './SideBar'
import { useState } from 'react'
export default function AdminLayout() {
const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className='flex flex-1 flex-col'>
            <AdminHeader  setOpen={setOpenSidebar}/>
            <main className='flex flex-col flex-1 bg-muted/40 md:p-6 p-4'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}
