const ChatSpace = ({ isEnabled, otherQuestions, socket }) => {
    return <ul>
        {isEnabled &&
            otherQuestions.map((question) =>
                <Question
                    key={questionId}
                    question={question}
                    noHandler={() => {
                        socket.emit("vote", { questionId, voteType: 'negative' });
                    }}
                    yesHandler={() => {
                        socket.emit("vote", { questionId, voteType: 'positive' });
                    }}
                />)
        }
    </ul>;
}