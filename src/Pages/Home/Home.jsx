
import Categories, {  } from "../../Components/Categories/Categories";
import style from './Home.module.css'
import {  } from "../../Components/Categories/Categories";
import SearchBar from '../../Components/SearchBar/SearchBar'
import Recommendations from "../../Components/Recommendations/Recommendations";
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