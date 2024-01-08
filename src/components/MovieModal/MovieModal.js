import React, { useRef } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '../../hooks/useOnClickOutside';

const MovieModal = (props) => {
    const ref = useRef();

    useOnClickOutside(ref, () => {
        props.setModalOpen(false);
    })

  return (
    <Modal role ="presentation">
        <div className="modal_wrap">
            <div className="modal" ref={ref}>
                <span
                    className='modal_close'
                    onClick={() => props.setModalOpen(false)}
                >X
                </span>
                <img 
                    className='modal_poster_img'
                    src={`https://image.tmdb.org/t/p/original/${props.backdrop_path}`} 
                    alt={`${props.title}`}
                />
                <ModalContent>
                    <p className="modal_detail">
                        <span className="modal_user_perc">100% for you</span>{" "}
                        {props.release_date ? props.release_date : props.first_air_date}
                    </p>

                    <h2 className="modal_title">{props.title ? props.title : props.name}</h2>
                    <p className="modal_overview">평점: {props.vote_average}</p>
                    <p className="modal_overview">{props.overview}</p>
                </ModalContent>
            </div>
        </div>
    </Modal>
  )
}

export default MovieModal

const Modal = styled.div`
    position:absolute;
    z-index: 1200;

    .modal_wrap {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.7);
        display:flex;
        align-items:center;
        justify-content: center;
    }
    .modal {
        position: relative;
        max-width: 800px;
        overflow:hidden;
        box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
                    0px 5px 8px 0px rgba(0,0,0,0.14);
        background: #111;
        border-radius: 8px;
        transition: all .4s;
        animation: fadeIn .4s;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: scale(0.5)
        }
        100% {
            opacity: 1;
            transform: scale(1)
        }
    }
    .modal::-webkit-scrollbar {
        display: none;
        visibility: hidden;
    }
    .modal_close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        z-index: 1000;
        color: #fff;
    }
    .modal_poster_img {
        width: 100%;
        height: auto;
    }
    @media screen and (max-height: 768px) {
        .modal_wrap {
            align-items: unset;
            padding-top: 2rem;
        }
        .modal {
            overflow-y: scroll;
        }
    }

    @media screen and (max-width: 768px){
        .modal {
            overflow-y: scroll !important;
        }
        .modal_wrap {
            padding: 0;
        }
        .modal_overview, .modal_detail {
            font-size: 16px;
        }
    }

`
const ModalContent = styled.div`
    padding: 40px;
    color: #fff;
    max-height: 250px;
    overflow-y:auto;

    &::-webkit-scrollbar {
        display: none;
        visibility: hidden;
    }
    .modal_title {
        padding: 0;
        font-size: 40px;
        margin: 15px 0;
    }
    .modal_detail {
        font-weight: 600;
        font-size: 18px
    }
    .modal_overview {
        font-size: 20px;
        line-height: 1.5
    }
`