import { Button, Input, InputAdornment, InputBase, InputLabel } from '@mui/material';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Router } from 'react-router-dom';
import PostService from '../api/PostService';
import FilmList, { MemoFilmList } from '../components/FilmsList';
import Header from '../components/Header';
import Search from '../components/Search';
import { ArrContext, PageContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import {useObserver} from '../hooks/useObserver'


function MainPage() {

    const {films, setFilms} = useContext(ArrContext)
    const {page, setPage} = useContext(PageContext)
    const [totalPages, setTotalPages] = useState(10)
    const [search, setSearch] = useState()
    const [filter,setFilter] = useState('')
  
  
    const lastElement = useRef()
  
  
    
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      if(page<totalPages) {
        const posts = await PostService.getAll(page);
          
            setFilms([...films, ...posts])
      }
        
  
    })
  
  
    useEffect(() => {
      
      fetchPosts();
      }, [page])
     
    useEffect(()=> {
      window.addEventListener('popstate', (event) => {
        if (event.state && page < totalPages) {
          setPage(prevValue => prevValue+1)
        }
       }, false);
      window.history.pushState({name: "browserBack"}, "on browser back click", window.location.href);
    }, [])
  

    useObserver(lastElement, page < totalPages, isPostsLoading,() => {
      if(films.length) setPage(page+1);
    })
  
      const searchedFilms = useMemo(() => {
       
        return [...films].filter(film => {
          if(film.nameRu) {
            return film.nameRu.toLowerCase().includes(filter)
          }
        })
  
      }, [filter, films])
      
      
       
    
  
    return (
      <div className="App">
        
        <Search
        filter={filter}
        setFilter={setFilter}
        />
        <div className='films__container'>
          { searchedFilms.length
          ? searchedFilms.map((film, index) => 
          <MemoFilmList 
            id={film.kinopoiskId}
            key={film.kinopoiskId+index}
            image={film.posterUrl}
            name={film.nameRu}
            countries={film['countries'][0]}
            year={film.year}
            >
          </MemoFilmList> )
            : <div className='failed__search'>
                <h2>Фильмы не найдены!</h2>
             </div>
          }
            
        </div>
        <div 
        ref={lastElement}>
        </div>
      </div>
    );
  }
  
  export const MemoMainPage = React.memo(MainPage);