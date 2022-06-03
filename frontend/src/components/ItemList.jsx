import React from 'react';
import InputItem from './InputItem';

const ItemList = ({list, inputType}) => {
    console.log(list);

    if (list.length) {
        return (
            <div className='itemList'>
                <h3>{inputType}</h3>
                {list.map((item, index) =>
                    <InputItem 
                        itemInfo={item}
                        number={index + 1}
                        key={item.id}
                    />)}
            </div>
        )
    } else {
        return (<div>No {inputType} yet</div>)
    }
}

export default ItemList