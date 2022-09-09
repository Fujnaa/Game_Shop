import React from 'react';

/*import Spiderman from '../../public/images/spidermanRemastered.jpg'
import GodOfWar from '../../public/images/GodOfWarRagnarok.jpg';
import DiscoElysium from '../../public/images/DiscoElysium.jpg';
import CallOfDuty from '../../public/images/CallOfDutyColdWar.jpg';*/

import Carousel from 'react-bootstrap/Carousel';

const Game = {
    Title: "God Of War: Ragnarok",
    Categories: [
        "Action",
        "RPG",
        "Open World"
    ],
    Price: 49.99,
    SalePrice: 0,
    OnSale: false
}

const MovingPoster = () => {

    return (

        <div className="movingPoster">

            <div className='movingPoster-description'>

                <h3>{Game.Title}</h3>

                <p className='movingPoster-price'>Price: {Game.Price}€</p>

                <div className='movingPoster-rating'>
                    <p>Reviews: 100</p>
                    <p>Average Rating: 3</p>
                </div>

                <div className='movingPoster-categories'>

                    <div className="movingPoster-category">
                        <a href="./Pages/Home">{Game.Categories[0]}</a>
                    </div>

                    <div className="movingPoster-category">
                        <a href="./Pages/Home">{Game.Categories[1]}</a>
                    </div>

                    <div className="movingPoster-category">
                        <a href="./Pages/Home">{Game.Categories[2]}</a>
                    </div>

                </div>


            </div>

            <div className='movingPoster-carouselBox'>
                <Carousel className='mainCarousel' touch>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src='/images/spidermanRemasteredNew.jpg' alt='Spiderman Remastered Poster' />
                    </Carousel.Item>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src='/images/CallOfDutyColdWar.jpg' alt='Call Of Duty Cold War Poster' />
                    </Carousel.Item>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src='/images/GodOfWarRagnarok.jpg' alt='God Of War: Ragnarok Poster' />
                    </Carousel.Item>
                    <Carousel.Item className='mainCarousel-item'>
                        <img src='/images/DiscoElysium.jpg' alt='Disco Elysium Poster' />
                    </Carousel.Item>
                </Carousel>
            </div>

        </div>
    );
}

export default MovingPoster;