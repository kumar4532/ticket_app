import React from 'react'
import TourPackage from '../../components/TourPackage'
import Logout from '../../components/Logout'

const Home = () => {
  let authorIsAdmin = true
  return (
    <div>
      <button className='btn btn-outline ml-[90%] text-2xl'><Logout /></button>
      <TourPackage />
    </div>
  )
}

export default Home