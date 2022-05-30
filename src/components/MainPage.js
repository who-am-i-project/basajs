import DescriptionSection from "./DescriptionSection"
import PlaySection from "./PlaySection"
import "../styles/MainPage.css";

const MainPage = (props) => {
    return <div className="main-page">
        <PlaySection />
        <DescriptionSection />
    </div>;
}

export default MainPage;