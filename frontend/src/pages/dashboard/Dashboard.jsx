import React from 'react'
import {Outlet} from "react-router"
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'

export const Dashboard = () => {
  return (
     <div className='bg-background'>
      {/* header */}
       <Header/>

      {/* main */}
       <main className='min-h-screen w-full sm:max-w-7xl mx-auto px-2 sm:px-4 md:px-0'>
        <Outlet/>
       </main>

      {/* footer */}
        <Footer/>
     </div>
  )
}
