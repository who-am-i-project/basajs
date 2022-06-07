import DescriptionSection from "./DescriptionSection"
import PlaySection from "./PlaySection.js"

const MainPage = (props) => {
    return <div className="App-header">
        <p className="HomePageText">Who am I?</p>

        <PlaySection />
        <DescriptionSection />
    </div>;
}

export default MainPage;
