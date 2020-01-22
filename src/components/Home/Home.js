import React, {Component} from 'react';
import firebase from "../../firebase/firebase";

class Home extends Component {

    render() {

        const user = firebase.auth().currentUser;

        return (

            <section className='header'>
                <p>Hello {user.displayName}</p>
            </section>
        )
    }
}

export default Home;