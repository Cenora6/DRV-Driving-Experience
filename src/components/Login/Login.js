import React, {Component} from 'react';
import HeaderWelcome from "./../Welcome/HeaderWelcome";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import {NavLink} from "react-router-dom";
import errorIcon from './../../assets/error.png'
import ReactTooltip from 'react-tooltip'
import {firebase} from "../firebase/firebase";

class Login extends Component {
    state = {
        email: "",
        password: "",
        errorEmail: false,
        loginError: false,
        errorText: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleFormSubmit = (e) => {

        this.setState({
            errorEmail: false,
            loginError: false,
            errorText: "",
        });

        e.preventDefault();

        const {password, email} = this.state;

        const emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailValidation.test(email) &&
            password.length >= 6) {

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((authUser) => {
                    this.setState({
                        email: "",
                        password: "",
                    });

                    sessionStorage.setItem("username", `${authUser.user.displayName}`);

                    firebase
                        .firestore()
                        .collection("users")
                        .where("email", "==", email )
                        .get()
                        .then(doc => {

                            doc.forEach(doc => {
                                const role = doc.data().role;

                                const {history} = this.props;
                                if(role === "user") {
                                    sessionStorage.setItem("role", "user");
                                    history.push("/home");
                                } else if (role === "admin") {
                                    sessionStorage.setItem("role", "admin");
                                    history.push("/admin");
                                }
                            });
                        });

                })
                .catch((error) => {
                    console.log(error.code);
                    if (error.code === 'auth/user-not-found') {
                        this.setState({
                            errorText: "This account doesn't exist",
                            loginError: true,
                            password: "",
                        })
                    }
                    if (error.code === 'auth/wrong-password') {
                        this.setState({
                            errorText: "Wrong password",
                            loginError: true,
                            password: "",
                        })
                    }
                });

        } else {
            if (!emailValidation.test(email)) {
                this.setState({
                    errorEmail: true,
                })
            }
        }
    };

    render() {

        return (
            <>
                <HeaderWelcome/>
                <section className='login'>
                    <form className='login__form' onSubmit={this.handleFormSubmit}>
                        <label htmlFor='email'>{this.state.errorEmail &&
                        <>
                            <span data-for='error__email' data-tip="">
                                <img className='error__icon' src={errorIcon} alt='error'/>
                            </span>
                            <ReactTooltip className='error__class' id='error__email' type='error' delayHide={2000} effect='solid'>
                                <span>Wrong email</span>
                            </ReactTooltip>
                        </>
                        } Email</label>
                        <input type='text' name='email' id='email' value={this.state.email} onChange={this.handleChange}/>

                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' value={this.state.password} onChange={this.handleChange}/>

                        <div className='login__form__buttons'>

                            <NavLink to='/register'>
                                <button className='buttons__small' type="submit" value="Submit">Register</button>
                            </NavLink>

                            {this.state.loginError ?
                                <>
                                    <span data-for='error__login' data-tip="">
                                    <button className='buttons__small' type="submit" value="Submit"
                                            onClick={this.handleFormSubmit}>Login</button>
                                    </span>
                                    <ReactTooltip className='error__class' id='error__login' type='error' delayHide={2000} effect='solid'>
                                        <span>{this.state.errorText}</span>
                                    </ReactTooltip>
                                </>

                                :
                                <button className='buttons__small' type="submit" value="Submit"
                                        onClick={this.handleFormSubmit}>Login</button>
                            }
                        </div>

                    </form>
                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default Login;