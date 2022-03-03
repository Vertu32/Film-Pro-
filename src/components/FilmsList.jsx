import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from "react";
import { ArrContext } from '../context';

const FilmList = function({image, name, countries, year, id}) {

    const router = useNavigate()
    const {films, setFilms} = useContext(ArrContext)
    let index
    let indexCount = () => {
        let indexOfFilms
        films.forEach((film, ind) => {
            
            if(film.kinopoiskId==id) {
                return indexOfFilms = ind
            }
        })
        return indexOfFilms
    }

    
  

    return(
        <div className='film__block' onClick={() => router(`/${id}_${indexCount()}`)}>
            {name
                ? <h2 className="film__head">{name}</h2>
                : <h2 className="film__head">Нет названия</h2>
                }
            <img className="film__img" src={image} alt="альтернативный текст"/>
            <div className="film__info">
               
                    {countries
                    ? <span>{countries.country}, {year}</span>
                    : <span></span>
                    }
                
            </div>
        </div>
    )
}

export const MemoFilmList = React.memo(FilmList);