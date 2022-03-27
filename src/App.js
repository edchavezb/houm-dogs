import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Layout from "./components/layout/Layout";

function App({data = "true"}) {

  useEffect(() => {
    console.log(process.env.REACT_APP_DOGS_KEY)
  }, [data])

  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search/>} />
            <Route path="/favorites" element={<Favorites/>} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
