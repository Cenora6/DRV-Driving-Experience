import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import tips from './../../Database/tips'
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import {FacebookShareButton, LinkedinShareButton, TwitterShareButton} from "react-share";
import ResultTest from "../Test/ResultTest";
import ReactTooltip from "react-tooltip";
import {firebase} from "../../firebase/firebase";

export default class AllTips extends Component {
    state = {
        shareWindow: false,
        shareCount: 0,
        likeCount: 0,
        clicked: false,
        clickedShare: false,
        result: false,
        chosenAnswer1: "",
        chosenAnswer2: "",
        chosenAnswer3: "",
        totalPoints: 0,
        question: "",
        questionError: false,
        date: [new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear()],
        questionConfirm: false,
        questionId: "",
    };

    componentDidMount() {
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

    checkAnswer1 = (e) => {
        this.setState({
            chosenAnswer1: e.target.value
        });
    };

    checkAnswer2 = (e) => {
        this.setState({
            chosenAnswer2: e.target.value
        });
    };

    checkAnswer3 = (e) => {
        this.setState({
            chosenAnswer3: e.target.value
        });
    };

    handleQuiz = (prevState) => {
        const i = this.props.match.params.id.toString();
        const correct1 = tips.tips[i - 1].test[0].correct;
        const correct2 = tips.tips[i - 1].test[1].correct;
        const correct3 = tips.tips[i - 1].test[2].correct;
        const { chosenAnswer1, chosenAnswer2, chosenAnswer3 } = this.state;
        if (chosenAnswer1 === "" || chosenAnswer2 === "" || chosenAnswer3 === "") {
            console.log("error!")
        } else {

            if(chosenAnswer1 === correct1) {
                this.setState(prevState => {
                    return {
                        totalPoints: prevState.totalPoints + 1
                    }
                });

                if(chosenAnswer2 === correct2) {
                    this.setState(prevState => {
                        return {
                            totalPoints: prevState.totalPoints + 1
                        }
                    });

                    if(chosenAnswer3 === correct3) {
                        this.setState(prevState => {
                            return {
                                totalPoints: prevState.totalPoints + 1
                            }
                        });
                    }
                }
            }
            this.setState({
                result: true,
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

    handleChange = (e) => {
        this.setState({
            question: e.target.value,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { question, date, questionId } = this.state;
        const i = this.props.match.params.id.toString();
        const weeklyTip = tips.tips[i - 1];

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
                question: "",
                questionError: false,
                questionConfirm: true,
            });

        } else {
            this.setState({
                questionError: true,
            })
        }
    };

    render() {
        for (let i = 0; i < tips.tips.length; i++) {
            tips.tips.sort( (a, b) => {
                return a.id - b.id;
            });
        }

        const i = this.props.match.params.id.toString();
        const tip = tips.tips[i - 1];
        const style = {
            position: "absolute",
            left: "1rem",
        };

        const linkStyle = {
            textDecoration: "none",
        };

        const clicked = {color: "#663FB6", fontSize: "2.5rem"};
        const shareUrl = 'https://github.com/Cenora6';
        const title = 'Visit Cenora6 on Github';
        const shares = parseInt(tip.share) + parseInt(this.state.shareCount);
        const likes = parseInt(tip.likes) + parseInt(this.state.likeCount);
        const test = tip.test;

        return (
            <>
                <Header/>
                <div className='tips__week' key={i}>
                    <div className='tips__week__title'>
                        <NavLink to={'/home'} style={style}>
                            <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                        </NavLink>
                        <h2>Weekly Tip</h2>
                        <span>{tip.added}</span>
                    </div>
                    <div className='tips__week__description'>
                        <h3>{tip.title}</h3>
                        <img src={tip.photovideo} alt='weekly-tip'/>
                        <p>
                            {tip.description}
                        </p>
                        <ul className='tips__week__description__tags'>
                            <li>
                                <i className="fas fa-tags"></i>
                            </li>
                            {tip.tags.map( (tag, index) => {
                                return(
                                    <>
                                        <NavLink to={`/tags/${tag}`} key={index} style={linkStyle} className='animation'>
                                            <li>{tag}</li>
                                        </NavLink>
                                        <li>|</li>
                                    </>
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
                <section className='test'>
                    {this.state.result && <ResultTest totalPoints={this.state.totalPoints}/>}
                    <div className='test__title'>
                        <h2>Training</h2>
                    </div>
                    <p className='test__instructions'>Answer the following questions. In every question there is only one possible answer</p>
                    <div className='test__questions'>
                        <div className='test__questions__single'>
                            <h4>{test[0].question}</h4>
                            <ul className='test__questions__single__text'>
                                <li className='radio'>
                                    <input type='radio' id='1A' name='question1' onChange={this.checkAnswer1} value={"answer1"}/>
                                    <label htmlFor='1A'><span>A.</span>{test[0].answer1}</label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='1B' name='question1' onChange={this.checkAnswer1} value={"answer2"}/>
                                    <div className="check"></div>
                                    <label htmlFor='1B'><span>B.</span>{test[0].answer2}</label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='1C' name='question1' onChange={this.checkAnswer1} value={"answer3"}/>
                                    <div className="check"></div>
                                    <label htmlFor='1C'><span>C.</span>{test[0].answer3}</label>
                                </li>
                            </ul>
                        </div>
                        <div className='test__questions__single'>
                            <h4>{test[1].question}</h4>
                            <ul className='test__questions__single__photos'>
                                <li className='radio'>
                                    <input type='radio' id='2A' name='question2' onChange={this.checkAnswer2} value={"answer1"}/>
                                    <label htmlFor='2A'>
                                        <div className='image'>
                                            <img src={test[1].answer1[1]} alt='quiz'/>
                                        </div>
                                        <span>A.</span>{test[1].answer1[0]}
                                    </label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='2B' name='question2' onChange={this.checkAnswer2} value={"answer2"}/>
                                    <div className="check"></div>
                                    <label htmlFor='2B'>
                                        <div className='image'>
                                            <img src={test[1].answer2[1]} alt='quiz'/>
                                        </div>
                                        <span>B.</span>{test[1].answer2[0]}

                                    </label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='2C' name='question2' onChange={this.checkAnswer2} value={"answer3"}/>
                                    <div className="check"></div>
                                    <label htmlFor='2C'>
                                        <div className='image'>
                                            <img src={test[1].answer3[1]} alt='quiz'/>
                                        </div>
                                        <span>C.</span>{test[1].answer3[0]}
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className='test__questions__single'>
                            <h4>{test[2].question}</h4>
                            <ul className='test__questions__single__text'>
                                <li className='radio'>
                                    <input type='radio' id='3A' name='question3' onChange={this.checkAnswer3} value={"answer1"}/>
                                    <label htmlFor='3A'><span>A.</span>{test[2].answer1}</label>
                                    <div className="check"></div>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='3B' name='question3' onChange={this.checkAnswer3} value={"answer2"}/>
                                    <div className="check"></div>
                                    <label htmlFor='3B'><span>B.</span>{test[2].answer2}
                                    </label>
                                </li>
                                <li className='radio'>
                                    <input type='radio' id='3C' name='question3' onChange={this.checkAnswer3} value={"answer3"}/>
                                    <div className="check"></div>
                                    <label htmlFor='3C'><span>C.</span>{test[2].answer3}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='test__button'>
                        <button className='buttons__small' onClick={this.handleQuiz}>Finish</button>
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        );
    }
}
