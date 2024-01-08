import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';

const SearchPage = () => {
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    //검색단어 가져오기
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    
    useEffect(() => {
        if(debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm)
        }
    },[debouncedSearchTerm])

    //해당 영화 가져오기
    const fetchSearchMovie = async (searchTerm) => {
        try {
            const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm})`);
            setSearchResult(response.data.results);
        } catch (error) {
            console.log(error)
        }
    }

    if(searchResult.length > 0) {
        return (
          <SearchMovie>
            {searchResult.map((movie) => {
                if(movie.backdrop_path !== null && movie.media_type !== "person") {
                    const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    return (
                        <div className='movie' key={movie.id}>
                            <div 
                                className='movie_column_poster'
                                onClick={() => navigate(`/${movie.id}`)}
                            >
                                <img 
                                    src={movieImageUrl} 
                                    alt={movie.id} 
                                    className='movie_poster'
                                />
                            </div>
                        </div>
                    )
                }
            })}
          </SearchMovie>
        )
    } else {
        return (
          <NoResult>
            <div className='no_result_txt'>
                <p>찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
            </div>
          </NoResult>
        )
    }
}

export default SearchPage

const SearchMovie = styled.section`
    background: #000;
    width: 100%;
    text-align: center;
    padding: 5rem 0;

    .movie {
        display: inline-block;
        padding: 0 0.5rem 7rem 0;
    }
    .movie_column_poster {
        cursor: pointer;
        transition: transform .3s;
        -webkit-transition: transform .3s
    }
    .movie_column_poster:hover {
        transform: scale(1.25);
    }
    .movie_poster {
        width: 90%;
        border-radius: 5px
    }
`
const NoResult = styled.section`
    display: flex;
    justify-content: center;
    align-content: center;
    color: #c5c5c5;
    height: 100%;
    padding: 8rem
`