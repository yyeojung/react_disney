import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Nav = () => {
    const [show, setShow] = useState(false);
    
    //상단 헤더 배경 이벤트
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        })
        return() => {
            window.removeEventListener('scroll', () => {});
        }
    },[])

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
        </NavWrap>
    )
}

export default Nav

const NavWrap = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
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
    margin-top: 43px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`