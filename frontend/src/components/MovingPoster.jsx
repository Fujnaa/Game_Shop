import React from 'react';
import { useEffect } from 'react';
import api from '../api/api';

/*import Spiderman from '../../public/images/spidermanRemastered.jpg'
import GodOfWar from '../../public/images/GodOfWarRagnarok.jpg';
import DiscoElysium from '../../public/images/DiscoElysium.jpg';
import CallOfDuty from '../../public/images/CallOfDutyColdWar.jpg';*/

import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';




const MovingPoster = () => {

    const [slideIndicator, setSlideIndicator] = useState(0);
    const [isFirst, setIsFirst] = useState(true);

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {

        try {
            const response = await api.get('games');

            setProducts(response.data);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else console.log(`Error: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const [game, setGame] = useState({
        id: "63209a2e525d278bd0d2a520",
        title: "Spiderman Remastered",
        path: "\\images\\spidermanRemasteredNew.jpg",
        categories: [
            "Action",
            "Fighting",
            "Open World"
        ],
        price: 49.99,
        salePrice: 44.99,
        onSale: true
    });


    useEffect(() => {

        console.log(slideIndicator);

        if (slideIndicator == 0 && game.title !== 'Spiderman Remastered')
            setGame(products[0]);

        else if (slideIndicator == 1) {
            setGame(products[1]);
        }

        else if (slideIndicator == 2) {
            setGame(products[2]);
        }

        else if (slideIndicator == 2) {
            setGame(products[3]);
        }

        else if (slideIndicator == 3) {
            setGame(products[4]);
        }

        else if (slideIndicator > 3)
            setSlideIndicator(0);


    }, [slideIndicator])

    return (

        <div className="movingPoster">

            <div className='movingPoster-description'>

                <h3>{game.title}</h3>

                <p className='movingPoster-price'>Price: {game.price}€</p>

                <div className='movingPoster-categories'>

                    <div className="movingPoster-category">
                        <a href="./Pages/Home">{game.categories[0]}</a>
                    </div>

                    {(game.categories.length < 2 ? <></> : (<div className="movingPoster-category"> <a href="./Pages/Home"> {game.categories[1]} </a> </div>))}


                    {(game.categories.length < 3 ? <></> : (<div className="movingPoster-category"> <a href="./Pages/Home"> {game.categories[2]} </a> </div>))}


                </div>


            </div>

            <div className='movingPoster-carouselBox'>
                <Carousel fade onSlide={() => setSlideIndicator(slideIndicator + 1)} className='mainCarousel' touch>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src={game.path} alt='Spiderman Remastered Poster' />
                    </Carousel.Item>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src={game.path} alt='Call Of Duty Cold War Poster' />
                    </Carousel.Item>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src={game.path} alt='God Of War: Ragnarok Poster' />
                    </Carousel.Item>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src={game.path} alt='Disco Elysium Poster' />
                    </Carousel.Item>
                </Carousel>
            </div>

        </div>
    );
}

export default MovingPoster;