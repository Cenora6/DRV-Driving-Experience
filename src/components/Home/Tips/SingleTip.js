import React, {Component} from 'react';
import tipPhoto from './../../../assets/weekly-tip.jpg'
import firebase from "../../firebase/firebase";
import errorIcon from "../../../assets/error.png";
import ReactTooltip from "react-tooltip";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {NavLink} from "react-router-dom";
import tips from "../../Database/tips";

class SingleTip extends Component {
    state = {
        question: "",
        questionError: false,
        randomTip: 0,
    };

    componentDidMount() {
        this.generateWeeklyTip();
    }

    handleChange = (e) => {
        this.setState({
            question: e.target.value,
        })
    };

    handleSubmit = (e) => {

        const user = firebase.auth().currentUser.displayName;
        e.preventDefault();
        const { question } = this.state;

        if (question.length > 100) {
            this.setState({
                question: "",
                questionError: false,
            });
            console.log(user, question);
        } else {
            this.setState({
                questionError: true,
            })
        }
    };

    generateWeeklyTip = () => {
        setInterval( () => {
            const random = Math.floor(Math.random() * (tips.tips.length));
            this.setState({
                randomTip: random,
            })
        }, 604800);
    };

    render() {
        const { randomTip } = this.state;
        const weeklyTip = tips.tips[randomTip];
        console.log(weeklyTip.added);
        return (
            <>
                <div className='tips__week'>
                    <div className='tips__week__title'>
                        <h2>Weekly Tip</h2>
                        <span>{weeklyTip.added}</span>
                    </div>
                    <div className='tips__week__description'>
                        <h3>{weeklyTip.title}</h3>
                        <img src={weeklyTip.photovideo} alt='weekly-tip'/>
                        <p>
                            {weeklyTip.description}
                        </p>
                        <div className='tips__week__description__button'>
                            <NavLink to={'/test'}>
                                <button className='buttons__small'>Take the test</button>
                            </NavLink>
                        </div>
                        <ul className='tips__week__description__tags'>
                            <li>
                                <i className="fas fa-tags"></i>
                            </li>

                            {weeklyTip.tags.map( (tag, index) => {
                                return(
                                    <>
                                        <li key={index}>{tag}</li>
                                        <li>|</li>
                                    </>
                                )
                            })}
                        </ul>
                        <div className='tips__week__description__sharing'>
                            <div className='tips__week__description__sharing__likes'>
                                <i className="fas fa-thumbs-up"></i>
                                <span>{weeklyTip.likes}</span>
                            </div>
                            <div className='tips__week__description__sharing__share'>
                                <i className="fas fa-share-alt"></i>
                                <span>{weeklyTip.share}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <form className='tips__questions'>
                    <span>Ask question</span>
                    <textarea value={this.state.question} onChange={this.handleChange}></textarea>
                </form>
                <div className='tips__button'>
                    {this.state.questionError &&
                    <>
                            <span data-for='error__email' data-tip="">
                                <img className='error__icon' src={errorIcon} alt='error'/>
                            </span>
                        <ReactTooltip className='error__class' id='error__email' type='error' delayHide={2000} effect='solid'>
                            <span>The question should have at least 100 characters!</span>
                        </ReactTooltip>
                    </>}
                    <span onClick={this.handleSubmit} className='buttons__small'>Send</span>
                </div>
            </>
        )
    }
}

export default SingleTip;