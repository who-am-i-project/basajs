import { Link } from 'react-router-dom';
import '../styles/PlaySection.css'

const PlaySection = (props) => {
    return (<div className='play-section'>
        <Link to="/multiplayer">
            <button className='button-3' onClick={() => console.log('game opened')}>PLAY!</button>
        </Link>
    </div>);
}

export default PlaySection;
