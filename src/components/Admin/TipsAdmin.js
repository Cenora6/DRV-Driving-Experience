import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";

class TipsAdmin extends Component {

    render() {
        return (
            <>
                <Header/>
                <div>those are tips</div>
                <WelcomeFooter/>
            </>
        )
    }
}

export default TipsAdmin;