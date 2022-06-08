import { Link } from 'react-router-dom';
import 'styles/PlaySection.css'

const PlaySection = (props) => {
    return (<div className='PlaySection'>
        <Link to="/multiplayer">
            <button className='buttonBlue'>Play!</button>
        </Link>
    </div>);
}

export default PlaySection;
