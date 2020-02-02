import React, {Component} from 'react';
import WelcomeFooter from "../Welcome/WelcomeFooter";
import Header from "../Home/Header";
import {NavLink} from "react-router-dom";
import tips from "./../Database/tips"

class SingleTip extends Component {
    state = {
        editing: false,
    };

    handleEditing = (e, index) => {
        console.log(index);
        this.setState({
            editing: true,
        })
    };

    render() {
        const i = parseInt(this.props.match.params.id) - 1;
        const tip = tips.tips[i];
        const style = {
            position: "absolute",
            left: "1rem",
        };

        return (
            <>
                <Header/>
                <section className='admin'>
                    <div className='tips__week' key={i}>
                        <div className='tips__week__title'>
                            <NavLink to={'/admin-tips'} style={style}>
                                <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                            </NavLink>
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
                                    <i className="fas fa-thumbs-up animation" onClick={this.handleLike}></i>
                                    <span>{tip.likes}</span>
                                </div>
                                <div className='tips__week__description__sharing__share'>
                                    <i className="fas fa-share-alt animation" onClick={this.handleShare}></i>
                                    <span>{tip.share}</span>
                                </div>
                            </div>
                            <button className='buttons__small' onClick={(e) => this.handleEditing(e, i)}>Edit</button>
                        </div>
                    </div>
                </section>

                <WelcomeFooter/>
            </>
        )
    }
}

export default SingleTip;