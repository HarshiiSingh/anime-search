import { useState, useEffect } from 'react'
import reactLogo from "../../assets/react.svg"
import viteLogo from "../../../public/vite.svg"
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx"
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
      <Footer/>
    </>
  )
}

export default App
