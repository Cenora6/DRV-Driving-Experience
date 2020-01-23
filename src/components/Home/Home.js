import React, {Component} from 'react';
import firebase from "../firebase/firebase";
import Header from "./Header";

class Home extends Component {

    render() {

        return (
            <>
                <Header/>
            <span> those are tips</span>
            </>
        )
    }
}

export default Home;