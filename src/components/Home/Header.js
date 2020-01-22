import React, {Component} from 'react';
import firebase from "../firebase/firebase";
import logo from "../../assets/logo.png";
import {NavLink} from "react-router-dom";

class Header extends Component {

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
        const linkstyle = {
            textDecoration: "none",
            color: "#FFF",
        };

        return (
            <>
                <section className='header'>
                    <h1 className='header__title'>DRV</h1>
                    <img src={logo} alt={'driving'} className='header__logo'/>
                    <div className='header__user'>
                        <p className='header__user__name'>{user.displayName}</p>
                        <span className='header__user__desc'> profile |</span>
                        <span className='header__user__desc' onClick={this.handleLogOut}> logout</span>
                        <p className='header__user__desc'>points 34</p>
                    </div>
                </section>
                <section className='links'>
                    <ul className='links__list'>
                            <li className='links__list__advices cross__fade'><NavLink to='/home/' style={linkstyle}>Advices</NavLink></li>


                            <li className='links__list__forum cross__fade'><NavLink to='/forum/' style={linkstyle}>Forum</NavLink></li>

                        <li className='links__list__search'>
                            <input name='search' id='search' placeholder='search...'/>
                            <span><i className="fas fa-search"></i></span>
                        </li>
                    </ul>
                </section>
            </>
        )
    }
}

export default Header;