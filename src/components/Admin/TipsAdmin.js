import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import ReadMoreReact from 'read-more-react';
import {NavLink} from "react-router-dom";
import {firebase} from "../firebase/firebase";

class TipsAdmin extends Component {
    state = {
        tips: [],
    };

    componentDidMount() {
        this.getTips();
    }

    getTips = () => {
        firebase.firestore()
            .collection("tips")
            .orderBy("id", "desc");

        firebase
            .firestore()
            .collection("tips")
            .get()
            .then( (doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();
                    array.push(data);

                    array.sort( (a, b) => {
                        return b.id - a.id;
                    });

                    this.setState({
                        tips: array,
                    });
                });
            });
    };

    render() {
        const style = {
            textDecoration: "none",
            color: "#000",
            width: "100%",
        };
        const { tips } = this.state;
        return (
            <>
                <Header/>
                <section className='admin'>
                    <div className='admin__name'>
                        <h2>All tips</h2>
                    </div>
                </section>

                <section className='admin__tag'>
                    <NavLink to='/add' style={style}>
                        <button className='buttons__small'>New tip</button>
                    </NavLink>
                </section>

                {tips.map( (tip, index) => {
                    return (
                        <section className='tips admin' key={index}>
                            <div className='tips__single  admin__single'>
                                <NavLink to={`/admintips/${tip.id}`} style={style} key={index}>
                                    <div className='tips__single__description animation'>
                                        <img src={tip.photovideo} alt='singletip'/>
                                        <div className='tips__single__description__text'>
                                            <h3>{tip.title}</h3>
                                            <ReadMoreReact text={`${tip.description}`}
                                                           readMoreText="< read more >"
                                                           min={100}
                                                           ideal={100}
                                                           max={200}/>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </section>
                    )
                })}
                <WelcomeFooter/>
            </>
        )
    }
}

export default TipsAdmin;