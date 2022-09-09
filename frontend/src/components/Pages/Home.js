import React from "react"
import { Container, Row } from 'react-bootstrap';

import MovingPoster from "../MovingPoster";
import HorizontalPoster from "../HorizontalPoster";

import '../../Home.css';


const Home = () => {
    return (
        <>
            <Container>
                <Row className='firstSection'>
                    <MovingPoster />
                </Row>

                <Row className='secondSection'>


                    <HorizontalPoster />

                </Row>

                <Row>

                </Row>
            </Container>
        </>
    );
}

export default Home;
