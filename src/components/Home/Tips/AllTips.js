import {NavLink} from "react-router-dom";
import React from "react";
import tips from './../../Database/tips'
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";

function AllTips( {match} ) {

    for (let i = 0; i < tips.tips.length; i++) {
        tips.tips.sort( (a, b) => {
            return a.id - b.id;
        });
    }

    const i = match.params.id.toString();
    const tip = tips.tips[i - 1];
    const style = {
        position: "absolute",
        left: "1rem",
    };

    return (
        <>
            <Header/>
            <div className='tips__week' key={i}>
                <div className='tips__week__title'>
                    <NavLink to={'/home'} style={style}>
                        <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                    </NavLink>
                    <h2>Weekly Tip</h2>
                    <span>{tip.added}</span>
                </div>
                <div className='tips__week__description'>
                    <h3>{tip.title}</h3>
                    <img src={tip.photovideo} alt='weekly-tip'/>
                    <p>
                        {tip.description}
                    </p>
                    <ul className='tips__week__description__tags'>
                        <li>
                            <i className="fas fa-tags"></i>
                        </li>

                        {tip.tags.map( (tag, index) => {
                            return(
                                <>
                                    <li key={index}>{tag}</li>
                                    <li>|</li>
                                </>
                            )
                        })}
                    </ul>
                    <div className='tips__week__description__sharing'>
                        <div className='tips__week__description__sharing__likes'>
                            <i className="fas fa-thumbs-up"></i>
                            <span>{tip.likes}</span>
                        </div>
                        <div className='tips__week__description__sharing__share'>
                            <i className="fas fa-share-alt"></i>
                            <span>{tip.share}</span>
                        </div>
                    </div>
                </div>
            </div>
            <WelcomeFooter/>
        </>
    );
}

export default AllTips;