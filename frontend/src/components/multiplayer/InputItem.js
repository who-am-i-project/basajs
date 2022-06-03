import React from 'react';

const InputItem = ({ itemInfo, number }) => {
    console.log({ itemInfo, number })
    return (
        <div className='inputItem'>
            <div className='inputItem__content'>
                <strong>{itemInfo.inputType} {number}: </strong>
                <span>
                    {itemInfo.body}
                </span>
            </div>
        </div>
    )
}

export default InputItem;
