import React, {Component} from 'react';
import firebase from "../../firebase/firebase";
import {NavLink} from "react-router-dom";

class ResultTest extends Component {

    render() {
        const linkStyle = {
            textDecoration: "none",
        };
        const user = firebase.auth().currentUser;

        return (
            <div className='result'>
                <h4>Test: <br/> <span>Safe engine braking [54]</span> <br/> passed succesfully!</h4>
                <p>Congratulations <span>{user.displayName}</span></p>
                <p>You earned 5 points and now you have <span>72 points.</span></p>
                <div className='result__share'>
                    <p>Share your result:</p>
                    <div className='result__share__media'>
                        <i className="fab fa-facebook-square"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-linkedin"></i>
                    </div>
                </div>
                <NavLink to={'/home'} style={linkStyle} className='buttons__small'>Close the window and go back to TIPS</NavLink>
            </div>
        )
    }
}

export default ResultTest;