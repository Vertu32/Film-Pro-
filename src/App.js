import { Button, Input, InputAdornment, InputBase, InputLabel } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostService from './api/PostService';
import FilmList from './components/FilmsList';
import Header from './components/Header';
import Search from './components/Search';
import { ArrContext, PageContext } from './context';
import { useFetching } from './hooks/useFetching';
import {useObserver} from './hooks/useObserver'
import FilmIdPage from './pages/FilmIdPage';
import MainPage, { MemoMainPage } from './pages/MainPage';
import './style/App.css'

function App() {

  const [films, setFilms] = useState([])
  const [page, setPage] = useState(1)

  return (
    <ArrContext.Provider value={{
      films, 
      setFilms
    }}>
      <PageContext.Provider value={{
        page,
        setPage
      }}>
      
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="*" element={<MemoMainPage/>}/>
          <Route path="/:id" element={<FilmIdPage/>}/>
        </Routes> 
      </BrowserRouter>
      </PageContext.Provider>
    </ArrContext.Provider>  
  );
}

export default App;
