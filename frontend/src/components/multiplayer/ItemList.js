import React from 'react';
import InputItem from './InputItem';

const ItemList = ({ list, inputType }) => {
    if (list.length) {
        return (
            <div className='itemList'>
                <div className="itemHeader">{inputType}</div>
                {list.map((item, index) =>
                    <InputItem
                        itemInfo={item}
                        number={index + 1}
                        key={item.id}
                    />)}
            </div>
        )
    } else {
        return (<div className="itemHeader">No {inputType} Yet</div>)
    }
}

export default ItemList
