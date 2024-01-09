import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

const DetailPage = () => {
    let {movieId} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `/movie/${movieId}`
            )
            setMovie(response.data);
        }
        fetchData();
    }, [movieId])

    if(!movie) return null

    return (
        <Section>
            <img 
                className='modal_poster_img'
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.id}
            />
        </Section>
    )
}

export default DetailPage

const Section = styled.section`
    height: 100vh;
    overflow:hidden;
    img {
        height: 100%;
        object-fit:cover;
    }
`