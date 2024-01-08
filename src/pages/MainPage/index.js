 import React from 'react'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import Category from '../../components/Category'
import Row from '../../components/Row'
import requests from '../../api/request'
 
 const MainPage = () => {
   return (
    <Container>
        <Banner/>
        <Category/>
        <Row id="TN" title="Trending Now" fetchUrl={requests.fetchTrending}/>
        <Row id="TR" title="Top Rated" fetchUrl={requests.fetchTopRated}/>
        <Row id="AM" title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
        <Row id="CM" title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
    </Container>
   )
 }
 
 export default MainPage
 const Container = styled.main`
     position: relative;
     min-height: calc(100vh - 250px);
     overflow-x: hidden;
     display: block;
     top: 72px;
     padding: 0 calc(3.5vw + 5px);
 
     &:after {
         background: url("/images/home-background.png") center center/ cover no-repeat fixed;
         content: "";
         position: absolute;
         inset: 0px; //상하좌우 : 0
         z-index: -1;
     }
 `