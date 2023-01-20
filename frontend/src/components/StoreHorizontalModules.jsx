import React from 'react';
import { useState } from 'react';

import StoreVerticalModules from './StoreVerticalModules';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { Search } from 'react-bootstrap-icons';
import { useEffect } from 'react';


const radios = [
    { name: 'New Releases', value: '1' },
    { name: 'On Sale', value: '2' }
]

const StoreHorizontalModules = (props) => {

    const [radioValue, setRadioValue] = useState('1');

    const [searchTerm, setSearchTerm] = useState('');

    const[searchCategory, setSearchCategory] = useState([]);

    useEffect(() => {
        searchProducts();
    }, [radioValue])

    useEffect(() => {
        searchProducts();
    }, [searchCategory])

    function hasSubArray(master, sub) {
        return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
    }

    //SEARCH FUNCTIONALITY\\
    const searchProducts = () => {

        var items = [];


        if (radioValue == 2 && searchTerm=='' && searchCategory.length==0) {
            items = props.products.filter((item) => item.onSale == true)
        }

        else if (radioValue== 2 && searchTerm != '' && searchCategory.length==0)
            items = props.products.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) && item.onSale == true);

        else if (radioValue !== 2 && searchTerm != '' && searchCategory.length==0)
            items = props.products.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
        
        else if (radioValue == 2 && searchTerm != '' && searchCategory.length != 0)
            items = props.products.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) && item.onSale == true && hasSubArray(item.categories, searchCategory));

        else if (radioValue == 2 && searchTerm == '' && searchCategory.length != 0)
            items = props.products.filter((item) => item.onSale == true && hasSubArray(item.categories, searchCategory));
        
        else if (radioValue !== 2 && searchTerm != '' && searchCategory.length != 0)
            items = props.products.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) && hasSubArray(item.categories, searchCategory));
        
        else if (radioValue !== 2 && searchTerm == '' && searchCategory.length != 0) {
            items = props.products.filter((item) => hasSubArray(item.categories, searchCategory));
        }

        else if (radioValue !== 2 && searchTerm == '' && searchCategory.length == 0)
            items = props.products;

        props.setSearchedProducts(items);
    }

    return (
        <div className='horizontalModules'>

            <ButtonGroup className="horizontalButtons">
                {radios.map((radio, idx) => (
                    <ToggleButton
                        className='horizontalRadioButton'
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="secondary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>

            <div className='searchContainer'>
                <input
                    className='searchBar'
                    placeholder='Search For Games'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className='searchIcon' onClick={() => searchProducts()} />
            </div>

            <StoreVerticalModules searchCategory={searchCategory} setSearchCategory={setSearchCategory}/>

        </div>
    );
}

export default StoreHorizontalModules;