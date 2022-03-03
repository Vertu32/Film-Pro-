import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../api/PostService";
import { ArrContext } from "../context";
import { useFetching } from "../hooks/useFetching";

const FilmIdPage = function() {

    const params = useParams()
    const [film, setFilm] = useState({})
    
     
    const filmArr = params.id.split('_')
    const filmId = filmArr[0]
    const filmPage = () => {
        let count = 1
        let filmInd = filmArr[1]
        while (filmInd>19) {
            filmInd = filmInd-20
            count = count+1
        }
        return count
    }  

    console.log(filmPage(), filmId)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
   
        const posts = await PostService.getAll(filmPage());  
        console.log(posts)
        setFilm([...posts].filter(el =>  {
              if(el.kinopoiskId == filmId) {

                  return el
              }
          })[0])
    
      })
    
    
    
      useEffect(() => {
        fetchPosts();
        }, [])

    console.log(film)
    
    return(
        <div className="filmId__wrapper"> 
             
                   {film.nameRu
                        ?<div className="filmId__block"> 
                                 <h1>
                                {film.nameRu}
                                </h1>

                            <img className="filmId__img" src={film.posterUrl}/> 
                            
                            <div className="info__text__block">
                                <div className="info__text">Жанр: {film.genres[0].genre}</div> 
                                 <div className="info__text">Рейтинг КИНОПОИСК: {film.ratingKinopoisk}</div>
                                <div className="info__text"> Рейтинг Imdb: {film.ratingKinopoisk}</div>  
                                <div className="info__text">Год производства: {film.year}</div>  
                                <div className="info__text info__text__last">Страна производства: {film.countries[0].country}</div> 
                            </div>  
                        </div> 
                        
                        :  <div>Загрузка...</div>}
                            
            
                
                
            
            
        </div>
    )
}

export default FilmIdPage;