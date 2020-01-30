import React, {Component} from 'react';
import HeaderWelcome from "./../Welcome/HeaderWelcome";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import {NavLink} from "react-router-dom";
import errorIcon from './../../assets/error.png'
import ReactTooltip from 'react-tooltip';
import firebase from "./../firebase/firebase";

class Register extends Component {
    state = {
        login: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errorEmail: false,
        errorPassword: false,
        errorPassword2: false,
        errorLogin: false,
        registerError: false,
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleFormSubmit = (e) => {

        this.setState({
            errorPassword: false,
            errorPassword2: false,
            errorEmail: false,
            errorLogin: false,
        });

        e.preventDefault();

        const {password, passwordConfirm, email, login} = this.state;

        const emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( emailValidation.test(email) &&
            password.length >= 6 &&
            passwordConfirm.length >= 6 &&
            passwordConfirm === password &&
            login.length >= 3) {

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((authUser) => {
                    const user = firebase.auth().currentUser;
                    if(user){
                        user.updateProfile({
                            displayName: login,
                            uid: user.uid,
                    }).then( () => {
                            sessionStorage.setItem("login", `${authUser.user.displayName}`);
                            console.log(firebase.auth());
                            console.log("updated successfully!");
                            const displayName = user.displayName;
                            const uid = user.uid;
                            console.log(user, displayName, uid);
                    }).catch(function(error) {
                            console.log(error)
                        })
                    }

                    this.setState({
                        login: "",
                        email: "",
                        password: "",
                        password2: ""
                    });

                    const { history } = this.props;
                    history.push("/home");

                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        this.setState({
                            registerError: true,
                            password: "",
                            password2: ""
                        })
                    }
                });

            firebase.firestore().collection('users')
                .add({
                    login: login,
                    email: email,
                    points: 0,
                    gender: "",
                    description: "",
                    role: "user"
                }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });


            this.setState({
                login: "",
                email: "",
                password: "",
                passwordConfirm: "",
            });

        } else {
            if (password.length < 6) {
                this.setState({
                    errorPassword: true,
                })
            }
            if (passwordConfirm.length < 6 || passwordConfirm !== password) {
                this.setState({
                    errorPassword2: true,
                })
            }
            if (!emailValidation.test(email)) {
                this.setState({
                    errorEmail: true,
                })
            }
            if (login.length < 3) {
                this.setState({
                    errorLogin: true,
                })
            }
        }
    };

    render() {

        return (
            <>

                <HeaderWelcome/>
                <section className='register'>

                    <form className='register__form' onSubmit={this.handleFormSubmit}>
                        <label htmlFor='login'>{this.state.errorLogin &&
                        <>
                            <span data-for='error__login' data-tip="">
                                <img className='error__icon' src={errorIcon} alt='error'/>
                            </span>
                            <ReactTooltip className='error__class' id='error__login' type='error' delayHide={2000} effect='solid'>
                                <span>Login should have at least <br/> 3 characters.</span>
                            </ReactTooltip>
                        </>
                        } Login</label>

                        <input type='text' name='login' id='login'
                               value={this.state.login} onChange={this.handleChange}/>

                        <label htmlFor='email'>{this.state.errorEmail &&
                        <>
                            <span data-for='error__email' data-tip="">
                                <img className='error__icon' src={errorIcon} alt='error'/>
                            </span>
                            <ReactTooltip className='error__class' id='error__email' type='error' delayHide={2000} effect='solid'>
                                <span>Email should have @.</span>
                            </ReactTooltip>
                        </>
                        } Email</label>
                        <input type='text' name='email' id='email'
                               value={this.state.email} onChange={this.handleChange}/>

                        <label htmlFor='password'>{this.state.errorPassword &&
                        <>
                            <span data-for='error__password' data-tip="">
                                <img className='error__icon' src={errorIcon} alt='error'/>
                            </span>
                            <ReactTooltip className='error__class' id='error__password' type='error' delayHide={2000} effect='solid'>
                                <span>Password should have<br/> more than 6 characters.</span>
                            </ReactTooltip>
                        </>
                        } Password</label>
                        <input type='password' name='password' id='password'
                               value={this.state.password} onChange={this.handleChange}/>

                        <label htmlFor='passwordConfirm'>{this.state.errorPassword2 &&
                        <>
                            <span data-for='error__password2' data-tip="">
                                <img className='error__icon' src={errorIcon} alt='error'/>
                            </span>
                            <ReactTooltip className='error__class' id='error__password2' type='error' delayHide={2000} effect='solid'>
                                <span>Passwords are not the same.</span>
                            </ReactTooltip>
                        </>
                        } Password confirmation</label>
                        <input type='password' name='passwordConfirm' id='password__confirm'
                               value={this.state.passwordConfirm} onChange={this.handleChange}/>

                        <div className='register__form__buttons'>
                            <NavLink to='/login'>
                                <button className='buttons__small'>Login</button>
                            </NavLink>
                            {this.state.registerError ?
                                <>
                                    <span data-for='error__register' data-tip="">
                                        <button className='buttons__small' onClick={this.handleFormSubmit}>Register</button>
                                    </span>
                                    <ReactTooltip className='error__class' id='error__register' type='error' delayHide={2000} effect='solid'>
                                        <span>The email is already in use.</span>
                                    </ReactTooltip>
                                </>

                                :
                                <button className='buttons__small' onClick={this.handleFormSubmit}>Register</button>
                            }
                        </div>

                    </form>
                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default Register;