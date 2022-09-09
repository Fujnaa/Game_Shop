import React from 'react';
import { useState } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { Search } from 'react-bootstrap-icons';


const radios = [
    { name: 'Most Popular', value: '1' },
    { name: 'New Releases', value: '2' },
    { name: 'On Sale', value: '3' }
]

const StoreHorizontalModules = () => {

    const [radioValue, setRadioValue] = useState('1');

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
                    value=''
                />
                <Search  className='searchIcon'/>
            </div>

        </div>
    );
}

export default StoreHorizontalModules;