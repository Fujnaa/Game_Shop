import React from 'react';

const StoreCartProduct = (props) => {
    return (
        <div className='storeCart-product' onClick={props.onClick}>
            <img src={props.product.path} className='storeCart-image' alt={props.product.title}/>
            <h3 className='storeCart-title'>{props.product.title}</h3>
            <div className='storeCart-priceContainer'>
                {props.product.onSale ? <p className='storeCart-price'>{props.product.salePrice}</p> : <p className='storeCart-price'>{props.product.price}</p>}
                <p className='storeCart-amount'>x{props.product.amount}</p>
            </div>
        </div>
    );
}

export default StoreCartProduct;