import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchPage from "../SearchPage/SearchPage.jsx";
import DetailsPage from "../DetailsPage/DetailsPage.jsx";
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
