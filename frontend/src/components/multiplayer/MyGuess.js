const MyGuess = ({ guess }) => {
    return <div>
        <h2>
            Yes, you are {guess.text}!
        </h2>
        <div>
            {guess.correct && "You've guessed correctly"}
            {!guess.correct && "No, you've guessed incorrectly"}
        </div>
    </div>;
};

export default MyGuess;
