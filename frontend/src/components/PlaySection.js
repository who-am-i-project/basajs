import '../styles/PlaySection.css'

const PlaySection = (props) => {
    return <div className='play-section'>
        <button className='play-button' onClick={() => console.log('game opened')}>PLAY!</button>
    </div>
}

export default PlaySection;