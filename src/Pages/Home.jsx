import React from 'react'
import SearchBar from '../Components/SearchBar'
import Categories from '../Components/Categories'

import style from './Style/Home.module.css'

const Home = () => {
  return (
    <div>
        <SearchBar />
        <Categories/>
    </div>
  )
}

export default Home