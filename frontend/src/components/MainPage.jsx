import DescriptionSection from "./DescriptionSection"
import PlaySection from "./PlaySection.jsx"
import "../App.css";

const MainPage = (props) => {
    return <div className="App-header">
        <PlaySection />
        <DescriptionSection />
    </div>;
}

export default MainPage;
