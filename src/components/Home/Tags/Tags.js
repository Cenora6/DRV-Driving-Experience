import React from "react";
import tips from './../../Database/tips'
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import {NavLink} from "react-router-dom";
import ReadMoreReact from 'read-more-react';

function Tags( {match} ) {

    const i = match.params.id;
    const singleTip = tips.tips;

    let array = [];

    for (let j = 0; j < tips.tips.length; j++) {
        tips.tips.sort( (a, b) => {
            return a.id - b.id;
        });

        const tags = singleTip[j].tags;

        if (tags.indexOf(i) !== -1 ) {
            array.push(singleTip[j])
        }
    }

    const style = {
        textDecoration: "none",
        color: "#000",
    };

    return (
        <>
            <Header/>
            <section className='tags'>
                <div className='tags__name'>
                    <h2><i className="fas fa-tags"></i>{i}</h2>
                    <NavLink to={'/home'}>
                        <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                    </NavLink>
                </div>
            </section>

            {array.map( (tip, index) => {
                return (
                    <section className='tips' key={index}>
                        <div className='tips__single'>
                            <NavLink to={`/tips/${tip.id}`} style={style} key={index}>
                                <div className='tips__single__description animation'>
                                    <img src={tip.photovideo} alt='singletip'/>
                                    <div className='tips__single__description__text'>
                                        <h3>{tip.title}</h3>
                                        <ReadMoreReact text={`${tip.description}`}
                                                       readMoreText="< read more >"
                                                       min={150}
                                                       ideal={180}
                                                       max={300}/>
                                    </div>
                                </div>
                            </NavLink>
                            <ul className='tips__single__tags'>
                                <li><i className="fas fa-tags"></i></li>

                                {tip.tags.map( (tag, index) => {
                                    return(
                                        <>
                                            <NavLink to={`/tags/${tag}`} key={index} style={style}>
                                                <li key={index} className='animation'>{tag}</li>
                                            </NavLink>
                                            <li>|</li>
                                        </>
                                    )
                                })}
                            </ul>
                        </div>
                    </section>
                )
            })}

            <WelcomeFooter/>
        </>
    );
}

export default Tags;