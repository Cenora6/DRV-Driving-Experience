import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {firebase} from "../firebase/firebase";

class AdminQuestions extends Component {
    state = {
        questions: [],
        questionsPerPage: 10,
        currentPage: 1,
    };

    componentDidMount() {
        this.handleShowUsers();
    }

    handleShowUsers = () => {
        firebase
            .firestore()
            .collection("tips")
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
                        className={`${this.state.currentPage === i ? "buttons__small" : "forum__asks__pages__buttons"} animation pagination`}></button>
            );
        }
        if(buttonCount === 1) {
            return null;
        }
        return buttons;
    };

    render() {
        const { questions, currentPage, questionsPerPage } = this.state;
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
                        <h2>Questions</h2>
                        {filterQuestions.map((question, index) => {
                            return (
                                <section className='forum__asks__single admin' key={index}>
                                    <div className='single animation'>
                                        <p>{question.title}</p>
                                    </div>
                                </section>
                            )
                        })
                        }
                    </div>
                    <div className='forum__asks__pages'>
                        {buttonList}
                    </div>
                </section>
                <WelcomeFooter/>
            </>
        )
    }
}

export default AdminQuestions;