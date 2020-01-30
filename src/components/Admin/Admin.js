import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";

class Admin extends Component {

    render() {
        return (
            <>
                <Header/>
                <div>this is admin page</div>
                <WelcomeFooter/>
            </>
        )
    }
}

export default Admin;