import OtherQuestion from "./OtherQuestion"

const ChatSpace = ({ isEnabled, otherQuestions, socket }) => {
    return (
        <div className="ChatSpace">
            {
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
                        isDisabledOQ={false}
                    />)
            }
        </div>
    );
};

export default ChatSpace;
