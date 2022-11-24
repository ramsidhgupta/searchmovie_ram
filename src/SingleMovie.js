import React, { useState, useEffect } from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {API_URL} from "./context";
const SingleMovie = () => {
    
  
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState("");
    

    const getMovies = async(url) => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True"){
                setIsLoading(false);
                setMovie(data);
                console.log(data);
             }
          }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
      let timerout = setTimeout(() => {
        getMovies(`${API_URL}&i=${id}`); 
      }, 800);
      return ()=>clearTimeout(timerout);
      },[id] );
      
      
      if(isLoading){
        return(
          <div className = "movie-section">
            <div className = "loading"> Loading ....</div>
          </div>
        );
      }

      return (
        <section className = "movie-section">
          <div className = "movie-card">
            <figure>
              <img src={movie.Poster} alt=""/>
            </figure>
            <div className = "card-content">
              <p className = "title"> {movie.Title} </p>
              <p className = "card-text">Release Date: {movie.Released} </p>
              <p className = "card-text"> Movie Genre:{movie.Genre} </p>
              <p className = "card-text">IMDB Rating: {movie.imdbRating} </p>
              <p className = "card-text">Country: {movie.Country} </p>
              <NavLink to="/" className = ".back-btn">
                GO BACK
              </NavLink>
            </div>
          </div>
        </section>
      );
};
export default SingleMovie;