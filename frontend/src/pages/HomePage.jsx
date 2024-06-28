import React from 'react'
import Navbar from '../components/Navbar'
import HomeComponent from '../components/HomeComponent'
import AsideHomeComponent1 from '../components/AsideHomeComponent'
import AsideHomeComponent2 from '../components/AsideHomeComponent1'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HomeComponent />
      <AsideHomeComponent1/>
      <AsideHomeComponent2/>
    </div>
  )
}

export default HomePage
