import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'

const Nav = () => {
    const initialUserData = localStorage.getItem('userData') ?
    JSON.parse(localStorage.getItem('userData')) : {};
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();
    const [serchValue, setSerchValue] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [userData, setUserData] = useState(initialUserData);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                if(pathname ==="/") {
                    navigate("/main")
                }
            } else {
                navigate("/")
            }
        })
    }, [auth, navigate, pathname])

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
        .then(result => {
            setUserData(result.user);
            localStorage.setItem("userData", JSON.stringify(result.user))
        })
        .catch(error => {
            console.log(error)
        })
    }

    //logout event
    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            setUserData({});
            navigate('/');
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        //show가 자꾸 오류나서 찾아봄 $show로 해결
        <NavWrap $show={show}> 
            <Logo>
                <img 
                    onClick={() => (window.location.href = "/main")}
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
                <>
                    <Input 
                        className='nav_input' 
                        type='text' 
                        placeholder='검색해주세요.'
                        value={serchValue}
                        onChange={handleChange}
                    />

                    <LogOut>
                        <UserImg 
                            src={userData.photoURL} 
                            alt={userData.displayName}
                        />
                        <DropDown>
                            <span 
                                onClick={handleLogout}
                            >Logout</span>
                        </DropDown>
                    </LogOut>                    
                </>
            }
        </NavWrap>
    )
}

export default Nav

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100%;
    opacity: 0; 
    width: 58px;
`;

const LogOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition: all .5s;
        }
    }
`;
const UserImg = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
`;
const NavWrap = styled.nav`
    position: fixed;
    inset: 0;
    height: 70px;
    background-color: ${props => props.$show ? "#090b13" : "transparent"};
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