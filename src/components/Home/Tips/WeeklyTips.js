import React, {Component} from 'react';
import firebase from "../../firebase/firebase";
import ReactTooltip from "react-tooltip";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {NavLink} from "react-router-dom";
import tips from "../../Database/tips";
import {
    FacebookShareCount,
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton,
} from "react-share";

class WeeklyTips extends Component {
    state = {
        question: "",
        questionError: false,
        randomTip: 0,
        shareWindow: false,
        shareCount: 0,
        likeCount: 0,
        clicked: false,
        clickedShare: false,
        date: [new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear()],
        questionConfirm: false,
        questionId: "",
    };

    componentDidMount() {
        this.generateWeeklyTip();
        this.checkId();
    }

    checkId = () => {
        firebase.firestore()
            .collection("asks")
            .orderBy("id", "desc");

        firebase.firestore()
            .collection("asks")
            .get()
            .then( (doc) => {
                const idArray = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    idArray.push(data);

                    this.setState({
                        questionId: idArray.length,
                    })
                });
        })
    };

    handleChange = (e) => {
        this.setState({
            question: e.target.value,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { question, date, randomTip, questionId } = this.state;
        const weeklyTip = tips.tips[randomTip];

        if (question.length > 100) {
            firebase
                .firestore()
                .collection(`asks`)
                .add({
                    id: questionId + 1,
                    date: date.toString(),
                    tip: weeklyTip.title,
                    email: firebase.auth().currentUser.email,
                    login: firebase.auth().currentUser.displayName,
                    question: this.state.question,
                    answer: [],
                }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

            this.setState({
                questionConfirm: true,
                question: "",
                questionError: false,
            });

        } else {
            this.setState({
                questionError: true,
            })
        }
    };

    generateWeeklyTip = () => {
        const cday = new Date().getDay();
        const hour = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();
        if (cday === 1 && hour === 0 && minutes === 0 && seconds === 0) {
            this.setState({
                randomTip: Math.floor(Math.random() * (tips.tips.length)),
            })
        }
    };

    handleShare = (e) => {
        e.preventDefault();

        if (this.state.clickedShare === false) {
            this.setState({
                shareCount: this.state.shareCount + 1,
                shareWindow: !this.state.shareWindow,
                clickedShare: true,
            });
        } else {
            this.setState({
                shareCount: this.state.shareCount - 1,
                clickedShare: false,
            });
        }
    };

    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            shareWindow: !this.state.shareWindow,
        });
    };

    handleLike = (e) => {
        e.preventDefault();

        if (this.state.clicked === false) {
            this.setState({
                likeCount: this.state.likeCount + 1,
                clicked: true,
            });

        } else {
            this.setState({
                likeCount: this.state.likeCount - 1,
                clicked: false,
            });
        }
    };

    render() {
        console.log(this.state.questionId);
        const clicked = {color: "#663FB6", fontSize: "2.5rem"};
        const shareUrl = 'https://github.com/Cenora6';
        const title = 'Visit Cenora6 on Github';
        const linkStyle = {
            textDecoration: "none",
            color: "#D7D7D7",
        };
        const { randomTip } = this.state;
        const weeklyTip = tips.tips[randomTip];
        const shares = parseInt(weeklyTip.share) + parseInt(this.state.shareCount);
        const likes = parseInt(weeklyTip.likes) + parseInt(this.state.likeCount);
        return (
            <>
                <div className='tips__week' key={weeklyTip.id}>
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
                            <NavLink to={`/test/${weeklyTip.id}`}>
                                <button className='buttons__small'>Take the test</button>
                            </NavLink>
                        </div>
                        <ul className='tips__week__description__tags'>
                            <li>
                                <i className="fas fa-tags"></i>
                            </li>

                            {weeklyTip.tags.map( (tag, index) => {
                                return(
                                    <li key={index}>
                                        <NavLink to={`/tags/${tag}`} style={linkStyle}>
                                            <span className='animation'>{tag}</span>
                                        </NavLink>
                                        <span> | </span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className='tips__week__description__sharing'>
                            <div className='tips__week__description__sharing__likes'>
                                <i className="fas fa-thumbs-up animation" style={this.state.clicked ? clicked : null}
                                   onClick={this.handleLike}></i>
                                <span>{likes}</span>
                            </div>
                            <div className='tips__week__description__sharing__share'>
                                <i className="fas fa-share-alt animation"  style={this.state.clickedShare ? clicked : null}
                                   onClick={this.handleShare}></i>
                                <span>{shares}</span>
                            </div>
                            {this.state.shareWindow &&
                            <div className='shares'>
                                <h4>Click one of the platforms to share the post:</h4>
                                <div className='shares__icons'>
                                    <div className='facebook animation'>
                                        <FacebookShareButton
                                            url={shareUrl}
                                            quote={title}>
                                            <i className="fab fa-facebook-square"></i>
                                        </FacebookShareButton>
                                        <FacebookShareCount url={shareUrl}>
                                            {shareCount => <span>{shareCount}</span>}
                                        </FacebookShareCount>
                                    </div>
                                    <div className='twitter animation'>
                                        <TwitterShareButton
                                            url={shareUrl}
                                            title={title}>
                                            <i className="fab fa-twitter-square"></i>
                                        </TwitterShareButton>
                                    </div>
                                    <div className='linkedin animation'>
                                        <LinkedinShareButton
                                            url={shareUrl}
                                            title={title}>
                                            <i className="fab fa-linkedin"></i>
                                        </LinkedinShareButton>
                                    </div>
                                </div>
                                <button className='buttons__small' onClick={this.handleClose}>Close the window</button>
                            </div>}
                        </div>
                    </div>
                </div>
                <form className='tips__questions'>
                    <span>Ask question</span>
                    <textarea value={this.state.question} onChange={this.handleChange}></textarea>
                </form>
                <div className='tips__button'>
                    {this.state.questionConfirm && <span className='information'>Thank you for sending the question!</span>}
                    {this.state.questionError ?
                        <>
                            <span data-for='error__email' data-tip="">
                                <button onClick={this.handleSubmit} className='buttons__small'>Send</button>
                            </span>
                            <ReactTooltip className='error__class' id='error__email' type='error' delayHide={2000} effect='solid'>
                                <span>The question should have at least 100 characters!</span>
                            </ReactTooltip>
                        </> : <button onClick={this.handleSubmit} className='buttons__small'>Send</button>}
                </div>
            </>
        )
    }
}

export default WeeklyTips;