import axios from 'axios'
import React, { useState } from 'react'

const Search =() =>{
    const [inputValue, setInputValue] = useState('')
    const [movies, setMovies] = useState([])
    const [errormsg, setErrormsg] = useState('')

    const handleChange = async () => {
        const movieName = inputValue.trim().toLowerCase()
        console.log('Searching for:', movieName)

        if (movieName) {
            try {
                const response = await axios.get(`http://www.omdbapi.com/?s=${movieName}&apikey=99eb9fd1`)
                console.log('API Response:', response.data)

                if (response.data.Response === 'True') {
                    setMovies(response.data.Search)
                    
                } else {
                    
                    setErrormsg('No movies found. Please try again.')
                }
            } catch (error) {
                console.error('Error fetching data:', error)
                
            }
        } else {
            
            
        }
    }

    return (
        <div>
            <p>Search Movies</p>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter movie name"
            />
            <button onClick={handleChange}>Search</button>
            
            <div>
                {movies.length > 0 ? (
                    <>
                        {movies.map((movie) => (
                            <div key={movie.imdbID}>
                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                                <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                            </div>
                        ))}
                    </>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    )
}
export default Search