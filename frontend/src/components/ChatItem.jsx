import React from 'react';

const ChatItem = ({name, key, textType, textValue}) => {
    console.log({name,key})
    return (
        <div className='itemList'>
            <div className='inputItem__content'>
                <strong>{name} {key}</strong>
                <div>
                    {textType} : {textValue}
                </div>
            </div>
        </div>
    )
}

export default ChatItem;
