import React from 'react';

const InputItem = ({itemInfo, number}) => {
    console.log({itemInfo, number})
    if (itemInfo.body){ //temporary conditional statement, to be fixed
        return (
            <div className='inputItem'>
                <div className='inputItem__content'>
                    <strong>{itemInfo.inputType} {number}</strong>
                    <div>
                            {itemInfo.body}
                          
                    </div>
                </div>
            </div>
        )
    }else{
    return (
        <div className='inputItem'>
            <div className='inputItem__content'>
                <strong>{itemInfo.inputType} {number}</strong>
                <div>
                        {itemInfo}
                      
                </div>
            </div>
        </div>
    )}
}

export default InputItem;
