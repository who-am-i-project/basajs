import OtherQuestion from "./OtherQuestion"

const ChatSpace = ({ isEnabled, otherQuestions, socket }) => {
    return <div>
        {isEnabled &&
            otherQuestions.map((question) =>
                <OtherQuestion
                    key={question.questionId}
                    question={question}
                    noHandler={() => {
                        socket.emit("vote", { questionId: question.questionId, voteType: 'negative' });
                    }}
                    yesHandler={() => {
                        socket.emit("vote", { questionId: question.questionId, voteType: 'positive' });
                    }}
                />)
        }
    </div>;
};

export default ChatSpace;
