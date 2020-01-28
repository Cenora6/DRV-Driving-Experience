import React, {Component} from 'react';
import Header from "./../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import ReadMoreReact from 'read-more-react';
import firebase from "../../firebase/firebase";
import tips from './../../Database/tips'
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

class Forum extends Component {
    state = {
        questions: [],
        currentPage: 1,
        questionsPerPage: 3,
        buttons: 3,
        display:  false,
        fade: false,
        userQuestions: [],
        tagQuestions: [],
        pageCounter: 0,
    };

    componentDidMount() {
        this.handleAllAsks();
    }

    handleAllAsks = () => {
        firebase
            .firestore()
            .collection("asks")
            .get()
            .then((doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });
                array.reverse();
                this.setState({
                    questions: array,
                });
            });
        this.setState({
            pageCounter: 0,
        })
    };

    onClickPageNumber = (e, i) => {
        this.setState({
            currentPage: i
        });
    };

    showButtons = (buttonCount) => {
        let buttons = [];
        for (let i = 1; i <= buttonCount; i++) {
            buttons.push(
                <button key={i}
                        onClick={ (e) => this.onClickPageNumber(e, i)}
                        className={`${this.state.currentPage === i ? "buttons__small" : "forum__asks__pages__buttons"} animation pagination`}></button>
            );
        }
        return buttons;
    };

    handleShow = () => {
        this.setState({
            display: !this.state.display,
            fade: !this.state.fade,
        })

    };

    handleYourShow = () => {
        const email = firebase.auth().currentUser.email;
        firebase
            .firestore()
            .collection("asks")
            .where("email", "==", email)
            .get()
            .then((doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });
                array.reverse();
                this.setState({
                    userQuestions: array,
                });
            });
        this.setState({
            pageCounter: 1,
        })
    };

    handleTags = (e) => {
        const tag = e.target.innerHTML;

        let array = [];
        for (let i = 0; i < this.state.questions.length; i++) {
            if(this.state.questions[i].tip === tag) {

                array.push(this.state.questions[i])

                this.setState({
                    tagQuestions: array,
                })
            }
        }

        this.setState({
            pageCounter: 2,
        })
    };

    render() {
        const {currentPage, questionsPerPage, questions, display, userQuestions, tagQuestions} = this.state;
        const indexLast = currentPage * questionsPerPage;
        const indexFirst = indexLast - questionsPerPage;
        const filterQuestions = questions.slice(indexFirst, indexLast);

        const buttonCount = Math.ceil(parseInt(questions.length)/parseInt(questionsPerPage));
        const buttonUserCount = Math.ceil(parseInt(userQuestions.length)/parseInt(questionsPerPage));
        const buttonTagCount = Math.ceil(parseInt(tagQuestions.length)/parseInt(questionsPerPage));

        let buttonList;
        let buttonUserList;
        let buttonTagList;
        buttonList = this.showButtons(buttonCount);
        buttonUserList = this.showButtons(buttonUserCount);
        buttonTagList = this.showButtons(buttonTagCount);
        console.log(tagQuestions);

        return (
            <>
                <Header/>
                <section className='forum'>
                    <div className='forum__asks'>
                        <h2>Asks</h2>
                        <ul className='forum__asks__tags'>
                            <span className='buttons__small tag' onClick={this.handleShow}>Tips</span>
                            {tips.tips.map( (tip, index) => {
                                return (
                                    <SlideDown className={'my-dropdown-slidedown'} key={index}>
                                        {this.props.open ? this.props.children : null}
                                        <li className={ (display === false) && "hidden"} key={index} onClick={this.handleTags}>{tip.title}</li>
                                    </SlideDown>
                                )
                            })}
                            <span className='buttons__small tag' onClick={this.handleYourShow}>Your questions</span>
                            <span className='buttons__small tag' onClick={this.handleAllAsks}>All</span>
                        </ul>
                        <ul className='forum__asks__header'>
                            <li>
                                Title
                            </li>
                            <li>
                                Description
                            </li>
                            <li>
                                Posted
                            </li>
                        </ul>
                        { (this.state.pageCounter === 0) &&
                        filterQuestions.map( (question, index) => {
                            return (
                                <section key={index} className='forum__asks__single'>
                                    <div className='single'>
                                        <p className='title'>{question.tip}</p>
                                        <ReadMoreReact text={`${question.question}`}
                                                       readMoreText="read more..."
                                                       min={100}
                                                       ideal={100}
                                                       max={300}/>
                                        <div className='data'>
                                            <p>{question.login}</p>
                                            <p>{question.date}</p>
                                        </div>
                                    </div>
                                    <div className='forum__asks__answer' key={question.answer[0]}>
                                        <i className="far fa-comment"></i>
                                        <p> <span>Posted on: {question.answer[0]}</span> <br/>
                                            {question.answer[1]}
                                        </p>
                                    </div>
                               tagQuestions </section>
                            )
                        })
                        }
                        {(this.state.pageCounter === 1) &&
                        userQuestions.map( (question, index) => {
                            return (
                                <section key={index} className='forum__asks__single'>
                                    <div className='single'>
                                        <p className='title'>{question.tip}</p>
                                        <ReadMoreReact text={`${question.question}`}
                                                       readMoreText="read more..."
                                                       min={100}
                                                       ideal={100}
                                                       max={300}/>
                                        <div className='data'>
                                            <p>{question.login}</p>
                                            <p>{question.date}</p>
                                        </div>
                                    </div>
                                    <div className='forum__asks__answer' key={question.answer[0]}>
                                        <i className="far fa-comment"></i>
                                        <p> <span>Posted on: {question.answer[0]}</span> <br/>
                                            {question.answer[1]}
                                        </p>
                                    </div>
                                </section>
                            )
                        })
                        }

                        {/*{(tagQuestions !== []) ?*/}
                        {/*    <p>sddf</p>*/}

                        {/*    : null*/}

                        {/*}*/}

                        {/*{(this.state.pageCounter === 2) &&*/}
                        {/*    tagQuestions.map( (question, index) => {*/}
                        {/*        return (*/}
                        {/*            <section key={index} className='forum__asks__single'>*/}
                        {/*                <div className='single'>*/}
                        {/*                    <p className='title'>{question.tip}</p>*/}
                        {/*                    <ReadMoreReact text={`${question.question}`}*/}
                        {/*                                   readMoreText="read more..."*/}
                        {/*                                   min={100}*/}
                        {/*                                   ideal={100}*/}
                        {/*                                   max={300}/>*/}
                        {/*                    <div className='data'>*/}
                        {/*                        <p>{question.login}</p>*/}
                        {/*                        <p>{question.date}</p>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*                <div className='forum__asks__answer' key={question.answer[0]}>*/}
                        {/*                    <i className="far fa-comment"></i>*/}
                        {/*                    <p> <span>Posted on: {question.answer[0]}</span> <br/>*/}
                        {/*                        {question.answer[1]}*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*            </section>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}

                        {(this.state.pageCounter === 0) &&
                        <div className='forum__asks__pages'>
                            {buttonList}
                        </div>
                        }
                        {(this.state.pageCounter === 1) &&
                        <div className='forum__asks__pages'>
                            {buttonUserList}
                        </div>
                        }
                        {(this.state.pageCounter === 2) &&
                        <div className='forum__asks__pages'>
                            {buttonTagList}
                        </div>
                        }

                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default Forum;