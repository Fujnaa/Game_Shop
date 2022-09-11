import React from 'react';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const checkBoxes = [
    { name: 'Action', value: '1' },
    { name: 'Adventure', value: '2' },
    { name: 'Fighting', value: '3' },
    { name: 'Horror', value: '4' },
    { name: 'Open World', value: '5' },
    { name: 'RPG', value: '6' },
    { name: 'Shooter', value: '7' },
    { name: 'Simulator', value: '8' },
    { name: 'Strategy', value: '9' }
]

const StoreVerticalModules = () => {

    //var activeCategories = [];

    const [category, setCategory] = useState([]);

    /*useEffect (() => {
        activeCategories.push(category);
        console.log(activeCategories);
    }, [category]);*/

    return (
        <div className="storeVerticalModules">
            <Form>
            {checkBoxes.map((checkBox, idx) => (
                <Form.Check
                    type='checkbox'
                    key={idx}
                    id={checkBox.value}
                    className='storeCheckBox'
                    label={checkBox.name}
                    value={checkBox.name}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                />
            ))}
            </Form>
        </div>
    );
}

export default StoreVerticalModules;