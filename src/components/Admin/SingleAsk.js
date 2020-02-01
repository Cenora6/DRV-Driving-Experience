import React, {Component} from "react";
import Header from "./../Home/Header.js";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import {firebase} from "../firebase/firebase";
import {NavLink} from "react-router-dom";

export default class SingleAsk extends Component {
    state = {
        question: [],
        editing: false,
        answer: "",
        date: [new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear()],
        time: [new Date().getHours() + ':' + new Date().getMinutes()],
    };

    componentDidMount() {
        this.getOneTask();
    }

    getOneTask = () => {
        const id = parseInt(this.props.match.params.id);
        firebase
            .firestore()
            .collection("asks")
            .where("id", "==", id)
            .get()
            .then((doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);
                });
                array.reverse();

                this.setState({
                    question: array,
                    answer: array[0].answer[1]
                });
            });
    };

    deleteData = (id) => {
        firebase
            .firestore()
            .collection("asks")
            .where("id", "==", id)
            .get()
            .then( doc => {
                doc.forEach( doc => {
                    firebase.firestore()
                        .collection("asks")
                        .doc(doc.id)
                        .delete()
                        .then( () => {
                            console.log("Document successfully deleted!");
                            this.setState({
                                questions: this.state.questions.filter(item => item.id !== id)
                            });
                            const { history } = this.props;
                            history.push("/admin-asks");
                        }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    })
                })
            });
    };

    handleChange = (e) => {
        this.setState({
            answer: e.target.value,
        })
    };

    handleAnswer = (e) => {
        this.setState({
            editing: true,
        })
    };

    handleEditAnswer = (id) => {
        const { question, answer, date, time } = this.state;
        firebase
            .firestore()
            .collection("asks")
            .where("id", "==", id)
            .get()
            .then( doc => {
                doc.forEach( doc => {
                            firebase.firestore()
                                .collection("asks")
                                .doc(doc.id)
                                .update({
                                    answer: [question[0].answer[0], answer, date.toString() + ", " + time.toString()],
                                })
                        .then( () => {
                            console.log("Document successfully updated!");
                            this.setState({
                                editing: false,
                            });
                            const { history } = this.props;
                            history.push("/admin-asks");
                        }).catch(function(error) {
                        console.error("Error updating document: ", error);
                    })
                })
            });
    };

    handleSaveAnswer =  (id) => {
        const { answer, date } = this.state;
        firebase
            .firestore()
            .collection("asks")
            .where("id", "==", id)
            .get()
            .then( doc => {
                doc.forEach( doc => {
                    firebase.firestore()
                        .collection("asks")
                        .doc(doc.id)
                        .update({
                            answer: [date.toString(), answer],
                        })
                        .then( () => {
                            console.log("Document successfully updated!");
                            this.setState({
                                editing: false,
                            });
                            const { history } = this.props;
                            history.push("/admin-asks");
                        }).catch(function(error) {
                        console.error("Error updating document: ", error);
                    })
                })
            });
    };

    render() {

        const { question, editing } = this.state;

        return (
            <>
                <Header/>
                {question.length > 0 ?
                    <>
                        <NavLink to={'/admin-asks'}>
                            <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                        </NavLink>
                        <section key={question[0].id} className='forum__asks__single admin__single'>
                            <div className='single'>
                                <p className='title'>{question[0].tip} <br/></p>
                                <p className='display-text-group'>{question[0].question}</p>
                                <div className='data'>
                                    <p>{question[0].login}</p>
                                    <p>{question[0].date} <br/>
                                        <i className="fas fa-times-circle animation animation2" onClick={ () => this.deleteData( question[0].id )}></i>
                                    </p>
                                </div>
                            </div>
                            {question[0].answer.length > 0 ?
                                <>
                                    <div className='forum__asks__answer' key={question[0].id}>
                                        <i className="far fa-comment"></i>
                                        {editing === true ?
                                            <textarea onChange={this.handleChange} value={this.state.answer}/>
                                            :
                                            <p>
                                                <span>Posted on: {question[0].answer[0]}</span><br/>
                                                {question[0].answer[1]} <br/>
                                                { (question[0].answer.length === 3) &&
                                                <span className='edited'>Edited on: {question[0].answer[2]}</span>}
                                            </p>
                                        }
                                    </div>
                                    {editing === true ?
                                        <button className='buttons__small' onClick={ () => this.handleEditAnswer(question[0].id)}>Save</button>
                                        :
                                        <button className='buttons__small' onClick={this.handleAnswer}>Edit</button>
                                    }
                                </>
                                :
                                <>
                                    <div className='forum__asks__answer' key={question[0].id}>
                                        <i className="far fa-comment"></i>
                                        {editing === true ?
                                            <textarea onChange={this.handleChange} value={this.state.answer}/>
                                            :
                                            <p>No answer yet</p>
                                        }
                                    </div>
                                    {editing === true ?
                                        <button className='buttons__small'
                                                onClick={() => this.handleSaveAnswer(question[0].id)}>Save</button>
                                        :
                                        <button className='buttons__small' onClick={this.handleAnswer}>Answer</button>
                                    }
                                </>
                            }
                        </section>
                    </>
                    :
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                }
                <WelcomeFooter/>
            </>
        );
    }
}


