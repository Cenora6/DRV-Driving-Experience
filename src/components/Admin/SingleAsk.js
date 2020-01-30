import React, {Component} from "react";
import Header from "./../Home/Header.js";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import firebase from "../firebase/firebase";
import {NavLink} from "react-router-dom";

export default class SingleAsk extends Component {
    state = {
        question: [],
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
                });
            });
    };

    render() {

        const { question } = this.state;
        console.log(question);
        console.log(question.length > 0)

        return (
            <>
                <Header/>
                {question.length > 0 ?
                    <>
                        <NavLink to={'/admin-asks'}>
                            <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                        </NavLink>
                    <section key={question[0].id} className='forum__asks__single'>
                        <div className='single'>
                            <p className='title'>{question[0].tip}</p>
                            <p className='display-text-group'>{question[0].question}</p>
                            <div className='data'>
                                <p>{question[0].login}</p>
                                <p>{question[0].date}</p>
                            </div>
                        </div>
                        {question[0].answer.length > 0 ?
                            <div className='forum__asks__answer' key={question[0].id}>
                                <i className="far fa-comment"></i>
                                <p><span>Posted on: {question[0].answer[0]}</span> <br/>
                                    {question[0].answer[1]}
                                </p>
                            </div>
                            :

                            <div className='forum__asks__answer' key={question[0].id}>
                                <i className="far fa-comment"></i>
                                <p>No answer yet</p>
                            </div>
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


