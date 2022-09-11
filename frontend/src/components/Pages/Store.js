import React from "react";
import { useState, useEffect } from "react";
import api from '../../api/games';

import '../../Store.css';

import HorizontalModules from "../StoreHorizontalModules";
import StoreVerticalModules from '../StoreVerticalModules';
import StoreProduct from "../StoreProduct";
import StoreCart from "../StoreCart";

var isAdmin = true;


const Store = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await api.get('games');
                setProducts(response.data)

            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else console.log(`Error: ${error.message}`);
            }
        }

        fetchProducts();
    }, [])

    const [showAddGameForm, setShowAddGameForm] = useState(false);

    const setForm = () => {
        setShowAddGameForm(!showAddGameForm);
    }

    const [gameTitle, setGameTitle] = useState('');
    const [gameCategories, setGameCategories] = useState([]);
    const [gamePrice, setGamePrice] = useState(0);
    const [gameOnSale, setGameOnSale] = useState(false);
    const [gameSalePrice, setGameSalePrice] = useState(0);
    const [gameImagePath, setGameImagePath] = useState('https://via.placeholder.com/600');

    useEffect(() => {
        console.log(gameTitle);
    }, [gameTitle])

    const submitNewGame = (event) => {
        console.log(event);
    }

    return (
        <>
            <HorizontalModules />
            <StoreVerticalModules />
            {products?.length > 0
                ? (
                    <div className='storeProductsContainer'>
                        {React.Children.toArray(
                            products.map((product) => (
                                <StoreProduct product={product} />

                            )))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No games found</h2>
                    </div>
                )

            }

            {isAdmin ? (

                <div className='gameOptions'>
                    <input type='button' onClick={setForm} className='gameOptions-button' value='Add Game' />
                    <input type='button' className='gameOptions-button' value='Edit Game' />
                    <input type='button' className='gameOptions-button' value='Remove Game' />
                </div>

            ) : (
                <></>
            )

            }

            {showAddGameForm ? (
                <div>
                    <form className='addGameForm'>
                        <label for='titleText' className='addGameForm-label'>Game Title:</label>
                        <input type='text' required onChange={(e) => setGameTitle(e.target.value)} className='addGameForm-input' id='titleText' name='titleText' />
                        <label for='categoriesSelect' className='addGameForm-label'>Select Game Categories:</label>
                        <select className='addGameForm-input' id='categoriesSelect' name="categoriesSelect" multiple>
                            <option value="1">Action</option>
                            <option value="2">Adventure</option>
                            <option value="3">Fighting</option>
                            <option value="4">Horror</option>
                            <option value="5">Open World</option>
                            <option value="6">RPG</option>
                            <option value="7">Shooter</option>
                            <option value="8">Simulator</option>
                            <option value="9">Strategy</option>
                        </select>
                        <label for='priceText' required className='addGameForm-label'>Game Price:</label>
                        <input type='text' className='addGameForm-input' id='priceText' name='priceText' />
                        <label for='saleCheckBox' className='addGameForm-label'>Is The Game On A Sale?</label>
                        <input type='checkbox' className='addGameForm-input' id='saleCheckbox' name='priceText' />
                        <label for='salePriceText' className='addGameForm-label'>Game Sale Price:</label>
                        <input type='text' className='addGameForm-input' id='salePriceText' name='salePriceText' />
                        <input type='file' accept='.jpg, .jpeg, .png' id='gameImage' name='gameImage' />

                        <input type='button' onClick={console.log(gameTitle)} id="submitButton" />
                    </form>
                </div>
            ) : (
                <></>
            )}

        </>
    );
}

export default Store;