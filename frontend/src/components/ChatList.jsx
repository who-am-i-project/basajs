import React from 'react';
import ChatItem from './ChatItem';
import InputItem from './InputItem';

const ChatList = ({list}) => {
    console.log(list)
    if (list.length) {
        return (
            <div className='itemList'>
                <h3>Player's Questions</h3>
                {/* {list.map((name, textValue, textType) =>
                    <ChatItem 
                    name={name}
                    textValue={textValue}
                    textType={textType}
                    key={name.id}
                    />)} */} 
                    {/* temporary solution, to be fixed */}
                                    {list.map((item, index) =>
                    <InputItem 
                        itemInfo={`${item.textType}: ${item.textValue}`}
                        number={`User: ${item.name}`}
                        key={item.id}
                    />)}
            </div>
        )
    } else {
        return (<div>No questions yet</div>)
    }
}

export default ChatList