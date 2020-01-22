import React, {Component} from 'react';
import HeaderWelcome from "./../Welcome/HeaderWelcome";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import {NavLink} from "react-router-dom";
import errorIcon from './../../assets/error.png'
import ReactTooltip from 'react-tooltip';

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
            login.length >= 6) {

            this.setState({
                login: "",
                email: "",
                password: "",
                passwordConfirm: "",
            })

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
            if (login.length < 6) {
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
                                <span>Login should have more <br/> than 6 characters.</span>
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
                            <button className='buttons__small' onClick={this.handleFormSubmit}>Register</button>
                        </div>

                    </form>
                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default Register;