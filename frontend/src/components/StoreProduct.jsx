import React from 'react';
import { useState } from 'react';
import api from '../api/api';

import { TrashFill } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import { useEffect } from 'react';


//'/images/GodOfWarRagnarok.jpg'
//"E:\\Projects\\WebProjekat\\game_shopV3\\frontend\\src\\images\\GodOfWarRagnarok.jpg"

const StoreProduct = (props) => {

    var loggedUser = props.loggedUser;
    var userToken = props.userToken;

    const [showEditGameForm, setShowEditGameForm] = useState(false);

    const setForm = () => {
        setShowEditGameForm(!showEditGameForm);
    }

    const [gamePrice, setGamePrice] = useState(0);
    const [gameOnSale, setGameOnSale] = useState(false);
    const [gameSalePrice, setGameSalePrice] = useState(0);
    const [gameImagePath, setGameImagePath] = useState('https://via.placeholder.com/600');

    const editGame = (id, editedGameImagePath, editedGamePrice, editedGameSalePrice, editedGameOnSale) => {
        props.editGame(props.product.id, gameImagePath, gamePrice, gameSalePrice, gameOnSale);
    }


    const gameDelete = async (id) => {

        var response;
        try {
            console.log(id);
            response = await api.delete(`games/${id}`, {
                headers: {
                    'Authorization': `bearer ${userToken}`
                }
            });

            props.fetchProducts();


        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

    return (
        <div className='storeProduct' onClick={props.onClick}>
            <img src={(props.product.path === null || props.product.path === undefined) ? 'https://via.placeholder.com/600' : props.product.path} alt={props.product.title}></img>

            <h1>{props.product.title}</h1>

            <div className='priceContainer'>
                {props.product.onSale ? <h3>{100 - ((((props.product.salePrice + 0.01) / (props.product.price + 0.01))).toFixed(2) * 100)}%</h3> : <></>}
                <div className='price'>
                    <p id='originalPrice'>{props.product.onSale ? <s>{props.product.price}</s> : props.product.price}</p>
                    {props.product.onSale ? <p id='salePrice'>{props.product.salePrice}</p> : <></>}
                </div>
            </div>

            {loggedUser.role === 'Admin' ? (
                <>
                    <div className='deleteButton'>
                        <TrashFill onClick={(e) => {
                            if (window.confirm(`Are you sure you want to delete ${props.product.title}?`)) {
                                gameDelete(props.product.id);
                            }
                        }

                        } />
                    </div>
                    <div className='editButton'>
                        < PencilSquare onClick={setForm} />

                    </div>
                </>
            ) : (
                <></>
            )
            }

            {showEditGameForm ? (
                <div>
                    <form className='editGameForm'>
                        <label for='priceText' className='editGameForm-label'>Game Price:</label>
                        <input type='text' required value={gamePrice} onChange={(e) => setGamePrice(e.target.value)} className='editGameForm-input' id='priceText' name='priceText' />
                        <label for='saleCheckBox' className='editGameForm-label'>Is The Game On A Sale?</label>
                        <input type='checkbox' value={gameOnSale} onChange={(e) => setGameOnSale(e.target.checked)} className='editGameForm-input' id='saleCheckbox' name='priceText' />
                        <label for='salePriceText' className='editGameForm-label'>Game Sale Price:</label>
                        <input type='text' value={gameSalePrice} onChange={(e) => setGameSalePrice(e.target.value)} className='editGameForm-input' id='salePriceText' name='salePriceText' />
                        <label for='fileText' className='editGameForm-label'>Game Image Path:</label>
                        <input type='file' onChange={(e) => setGameImagePath('\\images' + (e.target.value).slice(11))} accept='.jpg, .jpeg, .png' id='gameImage' name='gameImage' />
                        <input type='button' value='Submit' onClick={(e) => editGame(props.product.id, gameImagePath, gamePrice, gameSalePrice, gameOnSale)} id="submitButton" />
                    </form>
                </div>
            ) : (
                <></>
            )}

        </div>
    );
}

export default StoreProduct;