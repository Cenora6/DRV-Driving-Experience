import React, {Component} from 'react';
import {firebase} from "../firebase/firebase";
import logo from "../../assets/logo.png";
import {NavLink} from "react-router-dom";

class Header extends Component {
    state = {
        userPoints: "",
    };

    componentDidMount() {
        this.getPoints();
    }

    getPoints = () => {
        const email = firebase.auth().currentUser.email;

        firebase
            .firestore()
            .collection("users")
            .where("email", "==", email )
            .get()
            .then(doc => {
                const array = [];

                doc.forEach(doc => {
                    const points = doc.data().points;
                    array.push(points);
                });

                this.setState({
                    userPoints: array,
                });
        })
    };

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
        const linkstyle = {
            textDecoration: "none",
            color: "#FFF",
            width: "80%",
            cursor: "pointer",
        };

        const profileLink = {
            textDecoration: "none",
            color: "#CAAAD2",
            zIndex: 0,
        };

        return (
            <>
                <section className='header'>
                    <h1 className='header__title'>DRV</h1>
                    <img src={logo} alt={'driving'} className='header__logo'/>
                    <div className='header__user'>
                        <p className='header__user__name'>{firebase.auth().currentUser.displayName}</p>
                        <NavLink style={profileLink} to='/profile'><span className='header__user__desc'> profile</span></NavLink>
                        <span> | </span>
                        <span className='header__user__desc' onClick={this.handleLogOut}> logout</span>
                        {(sessionStorage.getItem("role") === "user") ?
                            <p className='header__user__desc'>points {this.state.userPoints}</p> :
                            null}
                    </div>
                </section>
                <section className='links'>
                    <ul className='links__list'>

                        {(sessionStorage.getItem("role") === "user") ?
                            <>
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
                            </>
                            :
                            <>
                                <NavLink to='/admin-users' style={linkstyle}>
                                    <li className='links__list__forum cross__fade'>Users</li>
                                </NavLink>
                                <NavLink to='/admin-tips' style={linkstyle}>
                                    <li className='links__list__advices cross__fade'>Advices</li>
                                </NavLink>
                                <NavLink to='/admin-questions' style={linkstyle}>
                                    <li className='links__list__forum cross__fade'>Questions</li>
                                </NavLink>
                                <NavLink to='/admin-asks' style={linkstyle}>
                                    <li className='links__list__advices cross__fade'>Asks</li>
                                </NavLink>
                            </>
                        }
                    </ul>
                </section>
            </>
        )
    }
}

export default Header;