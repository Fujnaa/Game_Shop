import React from 'react';

const StoreCart = (product) => {
    return(
        <div className='storeCart'>
            <div className='product'>
                <h2>{product.Title}</h2>
                <div className='priceContainer'>
                {product.OnSale ? <h3>{((product.SalePrice + 0.01)/(product.Price + 0.01)) * 100}%</h3> : <></>}
                <div className='price'>
                    <p id='originalPrice'>{product.OnSale ? <s>{product.Price}</s> : product.Price}</p>
                    {product.OnSale ? <p id='salePrice'>{product.SalePrice}</p> : <></>}
                </div>
            </div>
            </div>
        </div>
    );
}

export default StoreCart;