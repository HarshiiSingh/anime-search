import { useState, useEffect } from 'react'
import reactLogo from "../../assets/react.svg"
import viteLogo from "../../../public/vite.svg"
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx"
import SearchPage from "../SearchPage/SearchPage.jsx";
import DetailsPage from "../DetailsPage/DetailsPage.jsx"
import { getGenres } from '../../utils/jikanapi.js';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  // const [animeData, setAnimeData] = useState();
  // // const [search, setSearch] = useState('Naruto');
  // useEffect(() => {
  //   getGenres();
  // }, [])

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/details/:id" element={<DetailsPage/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
