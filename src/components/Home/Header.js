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
        sessionStorage.clear();
    };

    render() {
        const user = firebase.auth().currentUser;
        const linkstyle = {
            textDecoration: "none",
            color: "#FFF",
            width: "80%",
            cursor: "pointer",
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
                        <NavLink to='/home/' style={linkstyle}>
                            <li className='links__list__advices cross__fade'>Advices</li>
                        </NavLink>

                        <NavLink to='/forum/' style={linkstyle}>
                            <li className='links__list__forum cross__fade'>Forum</li>
                        </NavLink>

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