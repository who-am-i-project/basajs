import React from 'react';
import MyQuestion from './MyQuestion';
import MyGuess from './MyGuess';

import { nanoid } from 'nanoid';

const UserSpace = ({ personalQuestions, personalGuesses, postQuestionHandler, guessHandler, isEnabled, isFormEnabled, socket }) => {
    if (isEnabled) {
        return (
            <div className="GameInfo">
                <div>
                    {
                        personalQuestions.map((question) =>
                            <MyQuestion
                                key={question.questionId}
                                question={question}
                            />)
                    }
                </div>
                <div>
                    {
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
        );
    }
}


export default UserSpace;
