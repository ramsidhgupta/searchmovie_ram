import React, { useContext, useEffect, useState } from "react";


export const API_URL='https://www.omdbapi.com/?apikey=f0afc3d3';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    
    
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setError] = useState({show:"false", msg:""});
    const [query, setQuery] = useState("Avengers");

    const getMovies = async(url) => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True"){
                setIsLoading(false);
                setMovie(data.Search);
                console.log(data);
                }
            else{
                setError({show:"true", msg:data.error});
            }
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getMovies(`${API_URL}&s=${query}`);
    },[query] );

    return (
    <AppContext.Provider value = {{movie, isLoading, isError, query, setQuery}}>
        {children}
    </AppContext.Provider>
    );
};
const useGlobalContext = () => {
    return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};