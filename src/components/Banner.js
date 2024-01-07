import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import requests from '../api/request'
import styled from 'styled-components';

const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        //현재 상영중인 영화 정보 가져오기(여러 영화)
        const response = await axios.get(requests.fetchNowPlaying);
        
        //여러 영화 중 영화 하나의 id 가져오기
        const movieId = response.data.results[
            Math.floor(Math.random() * response.data.results.length)
        ].id
        //특정 영화의 더 상세한 정보 가져오기(비디오 정보도 포함)
        const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
            params: {append_to_response: "videos"}
        })
        setMovie(movieDetail)
    }

    //100글자 넘으면 ...
    const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n) + "..." : str;
    }
    
    if(isClick) {
        return (
            <>
                <Container>
                    <ContainerWrap>
                        <Iframe
                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                            allow='autoplay; fullscreen'
                        ></Iframe>
                    </ContainerWrap>
                </Container>
                <button
                    onClick={() => setIsClick(false)}
                >X</button>
            </>
        )
    } else {
        return (
            <BannerHeader
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover"
                }}
            >
                <div className="banner_contents">
                    <h1 className="banner_title">
                        {movie.title || movie.name || movie.original_name}
                    </h1>
    
                    <div className="banner_buttons">            
                        {movie?.videos?.results[0]?.key &&
                            <button
                                className='banner_button play'
                                onClick={() => setIsClick(true)}
                            >Play</button>
                        }
                    </div>
                    <p className="banner_desc">
                        {truncate(movie.overview, 100)}
                    </p>
                </div>
                <div className="banner_fadeBtm">
                    
                </div>
            </BannerHeader>
        )
    }
}

export default Banner

const BannerHeader = styled.header`
    color: #fff;
    object-fit: contain;
    height: 448px;

    .banner_contents {
        margin-left: 40px;
        padding-top: 140px;
        height: 190px;
    }
    .banner_title {
        font-size: 3rem;
        font-weight: 800;
        padding-bottom: .5rem;
    }
    .banner_desc {
        width: 45rem;
        line-height: 1.3;
        padding-top: 1rem;
        font-weight: 500;
        max-width: 400px;
        font-size: 1rem;
        height: 80px;
    }
    .banner_fadeBtm {
        height: 7.4rem;
        background-image: linear-gradient()
        180deg,
        transparent,
        rgba(37, 37, 37, 0.61),
        #111
    }
    .banner_buttons {
        display: flex;
    }
    .banner_button {
        display: flex;
        justify-content: start;
        align-items: center;
        cursor: pointer;
        outline: none;
        border: none;
        font-size: 1rem;
        font-weight: 700;
        padding: 0.4rem 1rem;
        margin-right: 1rem;
    }
    .banner_button:hover {
        color: #000;
        background: rgba(170,170,170, 0.9);
        transition: all 0.2s;
    }
    .play {
        background-color: #fff;
        color: #000;
    }

    @media screen and (min-width: 1500px) {
        position: relative;
        height: 600px;

        .banner_fadeBtm {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40rem;
        }
    }

    @media screen and (max-width: 768px) {
        .banner_contents {
            width: min-content !important;
            padding-left: 2.3rem;
            margin-left: 0px !important;
        }
        .banner_desc {
            font-size: 0.8rem !important;
            width: auto !important;
        }
        .info {
            text-align: start;
            padding-right: 1.2rem;
        }
        .space {
            margin-left: 6px
        }
        .banner_button {
            font-size: 0.8rem !important;
            border-radius: 4px !important;
        }
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`
const ContainerWrap = styled.div`
    width: 100%;
    height: 100%;
`

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`