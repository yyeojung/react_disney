import axios from '../api/axios';
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import MovieModal from './MovieModal/MovieModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

//import swiper style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import styled from 'styled-components';



const Row = ({title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelect, setMovieSelect] = useState({});

  //data 가져오기
  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  },[fetchUrl])

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])

  //modal 이벤트
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelect(movie)
  }

  return (
    <Container>
      <h2>{title}</h2>
      <Swiper
        //스와이퍼 옵션
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} 
        navigation //화살표
        pagination={{clickable: true}} //페이지버튼 보이게 하는거
        //반응형
        breakpoints={{
            1378: {
                slidesPerView: 6,
                slidesPerGroup: 6,
            },
            998: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            625: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            0: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
        }}
      >
        <Content id= {id}>
            {movies.map(movie => (
                <SwiperSlide>
                <Wrap>
                    <img
                    key={movie.id}
                    className='row_poster'
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                    />
                </Wrap>
                </SwiperSlide>
            ))}
        </Content>
      </Swiper>

      {modalOpen && 
        <MovieModal
        {...movieSelect}
            setModalOpen={setModalOpen}
        />
      }
    </Container>
  )
}

export default Row

const Container = styled.div`
    padding: 0 0 26px;

    .swiper-pagination {
        text-align: right !important;
    }
    .swiper-pagination-bullet {
        background: #ccc !important;
        opacity: 1 !important;
    }
    .swiper-pagination-bullet-active {
        background: #fff !important;
    }
    .swiper-button-prev, .swiper-button-next {
        color: #fff !important;
    }
    .swiper-button-prev::after, .swiper-button-next::after {
        font-size: 1.3rem !important;
        font-weight: 600 !important;
    }
`
const Content = styled.div`
`
const Wrap = styled.div`
    width: 95%;
    height: 95%;
    padding-top: 56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0/69%) 0px 26px 30px -10px,
                rgb(0 0 0/73%) 0px 16px 10px -10px;
    position: relative;
    overflow:hidden;
    transition: all .25s;
    border: 3px solid rgba(249, 249, 249, 0.1);

    img {
        inset: 0px;
        display: block;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        position: absolute;
        width: 100%;
        transition: opacity .5s;
        z-index: 1;
    }
    &:hover {
        box-shadow: rgb(0 0 0 /80%) 0px 40px 58px -16px,
                    rgb(0 0 0 /72%) 0px 30px 22px -10px;
        transform: scale(0.98);
        border-color: rgba(249, 249, 249, 0.8);
    }
`