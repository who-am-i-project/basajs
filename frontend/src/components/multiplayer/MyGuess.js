const MyGuess = (guess) => {
    return <div>
        <div>
            {guess.text}
        </div>
        <div>
            {guess.correct && "Guess correct"}
            {!guess.correct && "Guess incorrect"}
        </div>
    </div>;
};

export default MyGuess;
