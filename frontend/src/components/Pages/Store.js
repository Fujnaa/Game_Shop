import React from "react";
import { useState, useEffect } from "react";
import api from '../../api/api';

import '../../Store.css';

import HorizontalModules from "../StoreHorizontalModules";
import StoreProduct from "../StoreProduct";
import StoreCartProduct from "../StoreCartProduct";


const Store = (props) => {

    var loggedUser = props.loggedUser;
    var userToken = props.userToken;

    const [products, setProducts] = useState([]);
    const [searchedProducts, setSearchedProducts] = useState([]);

    //FETCH PRODUCTS
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

    //Fetch Products in the moment when something has changed in the products array
    useEffect(() => {

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

    //POST NEW GAME
    const postNewGame = async (event) => {
        event.preventDefault();

        console.log(gameImagePath);
        if (gameImagePath === null)
            setGameImagePath('https://via.placeholder.com/600');

        const newGame = { title: gameTitle, path: gameImagePath, categories: gameCategories, price: gamePrice, salePrice: gameSalePrice, onSale: gameOnSale };
        try {
            const response = await api.post('/games', newGame, {
                headers: {
                    'Authorization': `bearer ${userToken}`
                }
            });
            setProducts([...products, response.data]);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        setGameTitle('');
        setGameCategories([]);
        setGamePrice(0);
        setGameOnSale(false);
        setGameSalePrice(0);
        setGameImagePath('https://via.placeholder.com/600');
    }

    //EDIT GAME
    const editGame = async (id, editedGameImagePath, editedGamePrice, editedGameSalePrice, editedGameOnSale) => {

        if (gameImagePath === null) {
            setGameImagePath('https://via.placeholder.com/600');
        }


        const editedGame = {path: editedGameImagePath, price: editedGamePrice, salePrice: editedGameSalePrice, onSale: editedGameOnSale }
        var response;
        try {
            //631e18addb6ba2f32fcff113?path=asd&price=123&salePrice=321&onSale=false

            //?path:${editedGameImagePath}&price:${editedGamePrice}&salePrice:${editedGameSalePrice}&onSale:${editedGameOnSale}

            response = await api.put(`/games/${id}?`, `path=${editedGameImagePath}&price=${editedGamePrice}&salePrice=${editedGameSalePrice}&onSale=${editedGameOnSale}`, {
                headers: { 'Authorization': `bearer ${userToken}` }

            });
            

            //setProducts(products.map(product => product.id === id ? { ...response.data } : product));
            fetchProducts();

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

    }

    const [cart, setCart] = useState([]);

    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    const addToCart = (product) => {

        if(loggedUser.role === 'Admin')
            return null;

        var checkedCartItem = cart.find((cartItem) => cartItem.id === product.id);
        console.log(checkedCartItem);
        if(checkedCartItem === undefined) {
            const productWithAmount = {id: product.id, title: product.title, path: product.path, price: product.price, onSale: product.onSale, salePrice: product.salePrice, amount: 1}
            setCart([...cart, productWithAmount]);
            console.log(productWithAmount);
        }

        else
            checkedCartItem.amount++;

        setCartTotalPrice(cartTotalPrice + (product.onSale ? product.salePrice : product.price));
    }

    const removeFromCart = (product) => {
        const exist = cart.find((cartItem) => cartItem.id === product.id);
        if(exist.amount === 1)
            setCart(cart.filter(cartItem => cartItem.id !== product.id));
        else
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === product.id ? {...exist, amount: exist.amount - 1 } : cartItem
                )
            )
        setCartTotalPrice(cartTotalPrice - (product.onSale ? product.salePrice : product.price));
    }

    return (
        <>
            <HorizontalModules setSearchedProducts={setSearchedProducts} products={products}/>


            {cart?.length > 0
                ? (
                    <div className="storeCart">
                        {React.Children.toArray(
                            cart.map((cartItem) => (
                                <>
                                    <StoreCartProduct product={cartItem} onClick={(e) => removeFromCart(cartItem)} />
                                </>
                            ))
                        )}
                        <div className="storeCart-bottomModules">
                            <button className="storeCart-bottomButton" type="button">Checkout</button>
                            <h2 className="storeCart-bottomPriceText">Total Price: <h2 className="storeCart-bottomPrice">{cartTotalPrice.toFixed(2)}</h2></h2>


                        </div>
                    </div>
                ) : (
                    <></>
                )
            }


            {products?.length > 0
                ? (
                    <div className='storeProductsContainer'>

                        {searchedProducts.length === 0 ? (

                        React.Children.toArray(
                            products.map((product) => (
                                <StoreProduct onClick={(e) => addToCart(product)} fetchProducts={fetchProducts} userToken={userToken} loggedUser={loggedUser} editGame={editGame} product={product} />

                            )))
                        ) : (
                            searchedProducts.map((product) => (
                                <StoreProduct onClick={(e) => addToCart(product)} fetchProducts={fetchProducts} userToken={userToken} loggedUser={loggedUser} editGame={editGame} product={product} />
                            ))
                        )
                        
                        }
                    </div>
                        
                ) : (
                    <div className="empty">
                        <h2>No games found</h2>
                    </div>
                )

            }

            {loggedUser.role === 'Admin' ? (

                <div className='gameOptions'>
                    <input type='button' onClick={setForm} className='gameOptions-button' value='Add Game' />
                </div>

            ) : (
                <></>
            )

            }

            {showAddGameForm ? (
                <div>
                    <form className='addGameForm'>
                        <label for='titleText' className='addGameForm-label'>Game Title:</label>
                        <input type='text' required value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} className='addGameForm-input' id='titleText' name='titleText' />
                        <label for='categoriesSelect' className='addGameForm-label'>Select Game Categories:</label>
                        <select className='addGameForm-input' onChange={(e) => setGameCategories(Array.from(e.target.selectedOptions, option => option.value))} id='categoriesSelect' name="categoriesSelect" multiple>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Horror">Horror</option>
                            <option value="Open World">Open World</option>
                            <option value="RPG">RPG</option>
                            <option value="Shooter">Shooter</option>
                            <option value="Simulator">Simulator</option>
                            <option value="Strategy">Strategy</option>
                        </select>
                        <label for='priceText' className='addGameForm-label'>Game Price:</label>
                        <input type='text' required value={gamePrice} onChange={(e) => setGamePrice(e.target.value)} className='addGameForm-input' id='priceText' name='priceText' />
                        <label for='saleCheckBox' className='addGameForm-label'>Is The Game On A Sale?</label>
                        <input type='checkbox' value={gameOnSale} onChange={(e) => setGameOnSale(e.target.checked)} className='addGameForm-input' id='saleCheckbox' name='priceText' />
                        <label for='salePriceText' className='addGameForm-label'>Game Sale Price:</label>
                        <input type='text' value={gameSalePrice} onChange={(e) => setGameSalePrice(e.target.value)} className='addGameForm-input' id='salePriceText' name='salePriceText' />
                        <label for='fileText' className='addGameForm-label'>Game Image Path:</label>
                        <input type='file' onChange={(e) => setGameImagePath('\\images' + (e.target.value).slice(11))} accept='.jpg, .jpeg, .png' id='gameImage' name='gameImage' />

                        <input type='button' value='Submit' onClick={postNewGame} id="submitButton" />
                    </form>
                </div>
            ) : (
                <></>
            )}

        </>
    );
}

export default Store;