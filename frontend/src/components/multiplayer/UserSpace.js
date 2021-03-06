import React from 'react';
import MyQuestion from './MyQuestion';
import MyGuess from './MyGuess';

import { nanoid } from 'nanoid';

const UserSpace = ({ personalQuestions, personalGuesses, isEnabled }) => {
    let reversedQuestions = personalQuestions.reverse();
    let reversedGuesses = personalGuesses.reverse();
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
            </div>
        );
    }
}


export default UserSpace;
