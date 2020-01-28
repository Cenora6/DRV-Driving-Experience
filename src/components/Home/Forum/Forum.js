import React, {Component} from 'react';
import Header from "./../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import ReadMoreReact from 'read-more-react';
import firebase from "../../firebase/firebase";
import tips from './../../Database/tips'

class Forum extends Component {
    state = {
        questions: [],
        currentPage: 1,
        questionsPerPage: 3,
        buttons: 3,
        display:  false,
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
                        className={`${this.state.currentPage === i ? "buttons__small" : "forum__asks__pages__buttons"} animation`}>{i}</button>
            );
        }
        return buttons;
    };

    handleShow = () => {
        this.setState({
            display: !this.state.display,
        })

    };

    render() {
        const {currentPage, questionsPerPage, questions, display} = this.state;
        const indexLast = currentPage * questionsPerPage;
        const indexFirst = indexLast - questionsPerPage;
        const filterQuestions = questions.slice(indexFirst, indexLast);

        const buttonCount = Math.ceil(parseInt(questions.length)/parseInt(questionsPerPage));

        let buttonList;
        buttonList = this.showButtons(buttonCount);

        return (
            <>
                <Header/>
                <section className='forum'>
                    <div className='forum__asks'>
                        <h2>Asks</h2>
                        <ul className='forum__asks__tags'>
                            <span className='buttons__small' onClick={this.handleShow}>Tips</span>
                            {tips.tips.map( (tip, index) => {
                                return (
                                    <li className={ (display === false) ? "hidden" : "fadeInDown"} key={index}>{tip.id}</li>
                                )
                            })}
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
                        {filterQuestions.map( (question, index) => {
                            return (
                                <div key={index}>
                                    <div className='forum__asks__single'>
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
                                    <section className='forum__asks__answer'>
                                        <i className="far fa-comment"></i>
                                        <p> <span>Posted on: {question.answer[0]}</span> <br/>
                                            {question.answer[1]}
                                        </p>
                                    </section>
                                </div>
                            )
                        })}
                        <div className='forum__asks__pages'>
                            {buttonList}
                        </div>
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default Forum;