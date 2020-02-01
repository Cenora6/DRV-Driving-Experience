import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import firebase from "../firebase/firebase";
import {NavLink} from "react-router-dom";

class AsksAdmin extends Component {
    state = {
        questions: [],
        currentPage: 1,
        questionsPerPage: 10,
        buttons: 3,
        display:  false,
        clicked:  false,
        notAnsweredQuestions: [],
        notAnsweredNo: 0,
        pageCounter: 0,
    };
    componentDidMount() {
        this.getAllAsks();
    }

    getAllAsks = () => {
        firebase.firestore()
            .collection("asks")
            .orderBy("id", "desc");

        firebase
            .firestore()
            .collection("asks")
            .get()
            .then( (doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });

                array.sort( (a, b) => {
                    return b.id - a.id;
                });

                this.setState({
                    questions: array,
                });

                const notAnsweredArray = [];
                for (let i = 0; i < this.state.questions.length; i++) {
                    if(this.state.questions[i].answer.length === 0) {
                        notAnsweredArray.push(this.state.questions[i]);
                        this.setState({
                            notAnsweredNo: notAnsweredArray.length
                        })
                    }
                }
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

    handleNotAnswered = (e) => {
        let noAnswers = [];
        for (let i = 0; i < this.state.questions.length; i++) {
            if(this.state.questions[i].answer.length === 0) {
                noAnswers.push(this.state.questions[i]);
                this.setState({
                    notAnsweredQuestions: noAnswers,
                })
            }
        }

        this.setState({
            pageCounter: 1,
        })
    };

    render() {
        const {currentPage, questionsPerPage, questions, notAnsweredQuestions, notAnsweredNo} = this.state;
        const indexLast = currentPage * questionsPerPage;
        const indexFirst = indexLast - questionsPerPage;
        const filterQuestions = questions.slice(indexFirst, indexLast);
        const buttonCount = Math.ceil(parseInt(questions.length)/parseInt(questionsPerPage));
        const buttonNotAnsweredCount = Math.ceil(parseInt(notAnsweredQuestions.length)/parseInt(questionsPerPage));

        let buttonList;
        let buttonNotAnswered;
        buttonList = this.showButtons(buttonCount);
        buttonNotAnswered = this.showButtons(buttonNotAnsweredCount);

        const style = {
            color: "#000",
            textDecoration: "none",
        };
        return (
            <>
                <Header/>
                <section className='forum'>
                    <div className='forum__asks'>
                        <h2>Asks</h2>
                        <ul className='forum__asks__tags'>
                            <span className='buttons__small tag' onClick={this.getAllAsks}>All {questions.length}</span>
                            <span className='buttons__small tag' onClick={this.handleNotAnswered}>Not answered {notAnsweredNo}</span>
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
                        filterQuestions.map((question, index) => {
                            return (
                                <section className='forum__asks__single admin animation' key={question.id}>
                                    <NavLink to={`/a-asks/${question.id}`} style={style}>
                                        <div className='single'>
                                            <p className='title'>{question.tip}</p>
                                            {question.answer.length > 0 && <p className='answered'>Answered</p>}
                                            <div className='data'>
                                                <p>{question.login}</p>
                                                <p>{question.date}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </section>
                            )
                        })
                        }
                        {(this.state.pageCounter === 1) &&
                        notAnsweredQuestions.map( (question, index) => {
                            return (
                                <section key={question.id} id={question.id} className='forum__asks__single admin'>
                                    <NavLink to={`/a-asks/${question.id}`} style={style}>
                                        <div className='single'>
                                            <p className='title'>{question.tip}</p>
                                            {question.answer.length > 0 && <p className='answered'>Answered</p>}
                                            <div className='data'>
                                                <p>{question.login}</p>
                                                <p>{question.date}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </section>
                            )
                        })
                        }
                        {(this.state.pageCounter === 0) &&
                        <div className='forum__asks__pages'>
                            {buttonList}
                        </div>
                        }
                        {(this.state.pageCounter === 1) &&
                        <div className='forum__asks__pages'>
                            {buttonNotAnswered}
                        </div>
                        }
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default AsksAdmin;