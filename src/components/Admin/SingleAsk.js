import React, {Component} from "react";
import Header from "./../Home/Header.js";
import WelcomeFooter from "./../Welcome/WelcomeFooter";
import firebase from "../firebase/firebase";
import ReadMoreReact from "read-more-react";
import {NavLink} from "react-router-dom";

export default class SingleAsk extends Component {
    state = {
        questions: [],
    };

    componentDidMount() {
        this.getAllAsks();
    }

    getAllAsks = () => {
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

    render() {

        const { questions } = this.state;
        const i = this.props.match.params.id.toString();

        return (
            <>
                <Header/>
                {questions.length !== 0 ?
                    <>
                        <NavLink to={'/admin-asks'}>
                            <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                        </NavLink>
                    <section key={i} className='forum__asks__single'>
                        <div className='single'>
                            <p className='title'>{questions[i].tip}</p>
                            <ReadMoreReact text={`${questions[i].question}`}
                                           readMoreText="read more..."
                                           min={100}
                                           ideal={100}
                                           max={300}/>
                            <div className='data'>
                                <p>{questions[i].login}</p>
                                <p>{questions[i].date}</p>
                            </div>
                        </div>
                        <div className='forum__asks__answer' key={questions[i].answer[0]}>
                            <i className="far fa-comment"></i>
                            <p> <span>Posted on: {questions[i].answer[0]}</span> <br/>
                                {questions[i].answer[1]}
                            </p>
                        </div>
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


