import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";

class UsersAdmin extends Component {

    render() {
        return (
            <>
                <Header/>
                <div>those are users</div>
                <WelcomeFooter/>
            </>
        )
    }
}

export default UsersAdmin;