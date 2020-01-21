import React, {Component} from 'react';
import HeaderWelcome from "./HeaderWelcome";
import WelcomeFooter from "./WelcomeFooter";
import WelcomeText from "./WelcomeText";

class MainWelcome extends Component {

    render() {

        return (
            <>
                <HeaderWelcome/>
                <WelcomeText/>
                <WelcomeFooter/>
            </>
        )
    }
}

export default MainWelcome;