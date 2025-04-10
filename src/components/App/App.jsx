import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchPage from "../SearchPage/SearchPage.jsx";
import DetailsPage from "../DetailsPage/DetailsPage.jsx";
import Main from "../Main/Main.jsx";
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
