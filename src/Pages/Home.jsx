import React from 'react'
import SearchBar from '../Components/SearchBar'
import Categories from '../Components/Categories'

import style from './Style/Home.module.css'
import Recommendations from '../Components/Recommendations'

const Home = () => {
  return (
    <div>
        <SearchBar />
        <Categories/>
        <Recommendations/>
    </div>
  )
}

export default Home