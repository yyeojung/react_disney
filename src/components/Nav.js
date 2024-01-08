import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

const Nav = () => {
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();
    const [serchValue, setSerchValue] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        
    }, [])

    //상단 헤더 배경 이벤트
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return() => {
            window.removeEventListener('scroll', handleScroll);
        }
    },[])

    const handleScroll = () => {
        if(window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
        }

    }


    //영화 검색 이벤트
    const handleChange = (e) => {
        setSerchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`)
    }

    //login 이벤트
    const handleAuth = () => {
        signInWithPopup(auth, provider)
        .then(result => {})
        .catch(error => {
            console.log(error)
        })
    }

    return (
        //show가 자꾸 오류나서 찾아봄 $show로 해결
        <NavWrap $show={show}> 
            <Logo>
                <img 
                    onClick={() => (window.location.href = "/")}
                    alt="Disney Plus Logo" 
                    src="/images/logo.svg" 
                    />
            </Logo>

            {pathname === "/" ? 
                <Login
                    onClick={handleAuth}
                >
                    login
                </Login> :
                <Input 
                    className='nav_input' 
                    type='text' 
                    placeholder='검색해주세요.'
                    value={serchValue}
                    onChange={handleChange}
                />
            }
        </NavWrap>
    )
}

export default Nav

const NavWrap = styled.nav`
    position: fixed;
    inset: 0;
    height: 70px;
    background-color: ${props => props.show ? "#090b13" : "transparent"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`

const Logo = styled.a`
    padding:0;
    width: 80px;
    max-height: 70px;
    font-size: 0;
    display: flex;
    align-items: center;
    cursor:pointer;

    img {
        display: block;
        width: 100%;
    }
`

const Login = styled.a`
    background: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    transition: all .2s ease 0s;
    cursor: pointer;

    &:hover {
        background: #f9f9f9;
        color: gray;
        border-color: transparent;
    }
`;

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background: rgba(0,0,0,0.5);
    border-radius: 5px;
    color: #fff;
    padding: 5px;
    border: none;
`