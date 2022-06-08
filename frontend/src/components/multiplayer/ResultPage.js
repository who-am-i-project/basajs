const YesNoCell = ({ isPositive }) => {
    if (isPositive) {
        return <td className='greenCell'>Yes</td>;
    } else {
        return <td className='redCell'>No</td>;
    }
}

const ResultPage = ({ results }) => {
    return (<table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Won</th>
                <th>HP</th>
                <th>Disconnected</th>
                <th>Secret word</th>
            </tr>
        </thead>
        <tbody>
            {
                results.map((userResults, idx) =>
                    <tr key={idx}>
                        <td>{userResults.username}</td>
                        <YesNoCell isPositive={userResults.won} />
                        <td>{userResults.hp}</td>
                        <YesNoCell isPositive={userResults.hasDisconnected} />
                        <td>{userResults.secretWord}</td>
                    </tr>
                )
            }
        </tbody>
    </table>);
}

export default ResultPage;
