const MyGuess = ({ guess }) => {
    return <div className="GuessContainer">
        <p>
            Guess: {guess.text}
        </p>
        <div>
            Status:
            {guess.correct && " correct"}
            {!guess.correct && "incorrect"}
        </div>
    </div>;
};

export default MyGuess;
