import React, {Component} from 'react';
import firebase from "../firebase/firebase";

class Home extends Component {

    handleLogOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                window.location = '/';
            })
            .catch(error => {
                console.log(error)
            });
    };

    render() {

        const user = firebase.auth().currentUser;

        return (

            <section className='header'>
                <p>Hello {user.displayName}</p>
                <button onClick={this.handleLogOut}>Wyloguj</button>
            </section>
        )
    }
}

export default Home;