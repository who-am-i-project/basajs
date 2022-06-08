import OtherQuestion from "./OtherQuestion"

const ChatSpace = ({ isEnabled, otherQuestions, socket }) => {
    return (
        <div className="ChatSpace">
            {
                // if otherQuestions is empty display message, else display otherQuestions
                otherQuestions.length === 0 ?
                    <p>No other questions yet</p>
                    :
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
