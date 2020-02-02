import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import tips from "./../Database/tips"
import ReadMoreReact from 'read-more-react';
import {NavLink} from "react-router-dom";

class TipsAdmin extends Component {
    state = {
        tips: [],
    };

    render() {
        const style = {
            textDecoration: "none",
            color: "#000",
            width: "100%",
        };
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

                {tips.tips.map( (tip, index) => {
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