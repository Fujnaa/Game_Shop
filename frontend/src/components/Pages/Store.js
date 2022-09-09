import React from "react";
import { useState, useEffect } from "react";
import api from '../../api/games';

import '../../Store.css';

import HorizontalModules from "../StoreHorizontalModules";
import StoreVerticalModules from '../StoreVerticalModules';
import StoreProduct from "../StoreProduct";
import StoreProducts from "../StoreProducts";



const Store = () => {

    const [products, setProducts] = ([]);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await api.get('/games');
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

    return (
        <>
            <HorizontalModules />
            <StoreVerticalModules />
            {products?.length > 0
                ? (
                    <>
                        {products.map((product) => (
                            <StoreProduct product={product} />
                        ))}
                    </>
                ) : (
                    <div className="empty">
                        <h2>No games found</h2>
                    </div>
                )

            }

        </>
    );
}

export default Store;