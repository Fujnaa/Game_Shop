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
//'/images/GodOfWarRagnarok.jpg'
//"E:\\Projects\\WebProjekat\\game_shopV3\\frontend\\src\\images\\GodOfWarRagnarok.jpg"

const StoreProduct = ({ product }) => {
    return (
        <div className='storeProduct'>
            <img src={(product.path).slice(48)} alt={product.title}></img>

            <h1>{product.title}</h1>

            <div className='priceContainer'>
                {product.onSale ? <h3>{100 - ((((product.salePrice + 0.01)/(product.price + 0.01))).toFixed(2) * 100)}%</h3> : <></>}
                <div className='price'>
                    <p id='originalPrice'>{product.onSale ? <s>{product.price}</s> : product.price}</p>
                    {product.onSale ? <p id='salePrice'>{product.salePrice}</p> : <></>}
                </div>
            </div>

        </div>
    );
}

export default StoreProduct;