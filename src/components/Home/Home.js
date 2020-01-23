import React, {Component} from 'react';
import Header from "./Header";
import TipsMain from "./Tips/TipsMain";
import WelcomeFooter from "../Welcome/WelcomeFooter";

class Home extends Component {

    render() {

        return (
            <>
                <Header/>
                <TipsMain/>
                <WelcomeFooter/>
            </>
        )
    }
}

export default Home;