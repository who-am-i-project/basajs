import React from 'react';
import ItemList from './ItemList'
import Form from './Form';
import MyQuestion from './MyQuestion'
import MyGuess from './MyGuess'

import { nanoid } from 'nanoid'

const UserSpace = ({ personalQuestions, personalGuesses, isEnabled, socket, itemAdder, inputProps }) => {
    const renderForm = () => {
        if (inputProps.type.length === 0) {
            return (
                <div>
                    <button onClick={() => inputProps.typeSetter({ type: 'question' })}>Ask a question</button>
                    <button onClick={() => inputProps.typeSetter({ type: 'guess' })}>Guess</button>
                </div>
            )
        } else {
            return (
                <Form itemAdder={itemAdder} inputType={inputProps.type} />
            )
        }
    }

    return (
        <div>
            {
                renderForm()
            }
            <div>
                {isEnabled &&
                    personalQuestions.map((question) =>
                        <MyQuestion
                            key={question.questionId}
                            question={question}
                        />)
                }
            </div>
            <div>
                {isEnabled &&
                    personalGuesses.map((guess) =>
                        <MyGuess
                            key={nanoid()}
                            guess={guess}
                        />)
                }
            </div>
            {/* <ItemList list={questions} inputType={'questions'} />
            <hr />
            <ItemList list={guesses} inputType={'guesses'} /> */}
        </div>
    )
}


export default UserSpace;