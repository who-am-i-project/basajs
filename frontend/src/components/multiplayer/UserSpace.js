import React from 'react';
import MyQuestion from './MyQuestion';
import MyGuess from './MyGuess';

import { nanoid } from 'nanoid';

const UserSpace = ({ personalQuestions, personalGuesses, postQuestionHandler, guessHandler, isEnabled, isFormEnabled, socket }) => {
    let reversedQuestions= personalQuestions.reverse();
    let reversedGuesses= personalGuesses.reverse();
    if (isEnabled) {
        return (
            <div className="UserSpace">
                <div>
                    {
                        reversedQuestions.map((question) =>
                            <MyQuestion
                                key={question.questionId}
                                question={question}
                            />)
                    }
                </div>
                <div>
                    {
                        reversedGuesses.map((guess) =>
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
