import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import tips from './../../Database/tips'
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import {FacebookShareButton, FacebookShareCount, LinkedinShareButton, TwitterShareButton} from "react-share";

export default class AllTips extends Component {
    state = {
        shareWindow: false,
        shareCount: 0,
        likeCount: 0,
        clicked: false,
        clickedShare: false,
    };

    handleShare = (e) => {
        e.preventDefault();

        if (this.state.clickedShare === false) {
            this.setState({
                shareCount: this.state.shareCount + 1,
                shareWindow: !this.state.shareWindow,
                clickedShare: true,
            });
        } else {
            this.setState({
                shareCount: this.state.shareCount - 1,
                clickedShare: false,
            });
        }
    };

    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            shareWindow: !this.state.shareWindow,
        });
    };

    handleLike = (e) => {
        e.preventDefault();

        if (this.state.clicked === false) {
            this.setState({
                likeCount: this.state.likeCount + 1,
                clicked: true,
            });
        } else {
            this.setState({
                likeCount: this.state.likeCount - 1,
                clicked: false,
            });
        }
    };

    render() {
        for (let i = 0; i < tips.tips.length; i++) {
            tips.tips.sort( (a, b) => {
                return a.id - b.id;
            });
        }

        const i = this.props.match.params.id.toString();
        const tip = tips.tips[i - 1];
        const style = {
            position: "absolute",
            left: "1rem",
        };

        const linkStyle = {
            textDecoration: "none",
        };

        const clicked = {color: "#663FB6", fontSize: "2.5rem"};
        const shareUrl = 'https://github.com/Cenora6';
        const title = 'Visit Cenora6 on Github';
        const shares = parseInt(tip.share) + parseInt(this.state.shareCount);
        const likes = parseInt(tip.likes) + parseInt(this.state.likeCount);

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
                                        <NavLink to={`/tags/${tag}`} key={index} style={linkStyle} className='animation'>
                                            <li>{tag}</li>
                                        </NavLink>
                                        <li>|</li>
                                    </>
                                )
                            })}
                        </ul>
                        <div className='tips__week__description__sharing'>
                            <div className='tips__week__description__sharing__likes'>
                                <i className="fas fa-thumbs-up animation" style={this.state.clicked ? clicked : null}
                                   onClick={this.handleLike}></i>
                                <span>{likes}</span>
                            </div>
                            <div className='tips__week__description__sharing__share'>
                                <i className="fas fa-share-alt animation"  style={this.state.clickedShare ? clicked : null}
                                   onClick={this.handleShare}></i>
                                <span>{shares}</span>
                            </div>
                            {this.state.shareWindow &&
                            <div className='shares'>
                                <h4>Click one of the platforms to share the post:</h4>
                                <div className='shares__icons'>
                                    <div className='facebook animation'>
                                        <FacebookShareButton
                                            url={shareUrl}
                                            quote={title}>
                                            <i className="fab fa-facebook-square"></i>
                                        </FacebookShareButton>
                                        <FacebookShareCount url={shareUrl}>
                                            {shareCount => <span>{shareCount}</span>}
                                        </FacebookShareCount>
                                    </div>
                                    <div className='twitter animation'>
                                        <TwitterShareButton
                                            url={shareUrl}
                                            title={title}>
                                            <i className="fab fa-twitter-square"></i>
                                        </TwitterShareButton>
                                    </div>
                                    <div className='linkedin animation'>
                                        <LinkedinShareButton
                                            url={shareUrl}
                                            title={title}>
                                            <i className="fab fa-linkedin"></i>
                                        </LinkedinShareButton>
                                    </div>
                                </div>
                                <button className='buttons__small' onClick={this.handleClose}>Close the window</button>
                            </div>}
                        </div>
                    </div>
                </div>
                <WelcomeFooter/>
            </>
        );
    }
}
