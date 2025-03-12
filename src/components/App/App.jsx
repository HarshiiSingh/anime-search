import { useState, useEffect } from 'react'
import reactLogo from "../../assets/react.svg"
import viteLogo from "../../../public/vite.svg"
import Header from "../Header/Header.jsx";
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  // const [animeData, setAnimeData] = useState();
  // const [search, setSearch] = useState('Naruto');
  // // const getData = async() => {
  //   const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}@limit=20`)
  //   const resData = await res.json();
  //   setAnimeData(resData.data);
  // }
  // useEffect(() => {
  //   getData()
  // }, [search])
  return (
    <>
      <Header/>
    </>
  )
}

export default App
