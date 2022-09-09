import React from 'react';

//import Spiderman from '../../public/images/SpidermanRemastered.jpg';

var onSale = true;

const Game = {
    Title: "God Of War: Ragnarok",
    Path: '/images/GodOfWarRagnarok.jpg',
    Categories: [
        "Action",
        "RPG",
        "Open World"
    ],
    Price: 59.99,
    SalePrice: 29.99,
    OnSale: true
}

const Game2 = {
    Title: "God Of War: Ragnarok",
    Categories: [
        "Action",
        "RPG",
        "Open World"
    ],
    Price: 59.99,
    SalePrice: 29.99,
    OnSale: true
}

const StoreProduct = ({ product }) => {
    return (
        <div className='storeProduct'>

            <img src='/images/GodOfWarRagnarok.jpg' alt={product.Title}></img>

            <h1>{product.Title}</h1>

            <div className='priceContainer'>
                {product.OnSale ? <h3>{((product.SalePrice + 0.01)/(product.Price + 0.01)) * 100}%</h3> : <></>}
                <div className='price'>
                    <p id='originalPrice'>{product.OnSale ? <s>{product.Price}</s> : product.Price}</p>
                    {product.OnSale ? <p id='salePrice'>{product.SalePrice}</p> : <></>}
                </div>
            </div>

        </div>
    );
}

export default StoreProduct;