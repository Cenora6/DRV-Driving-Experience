import React, {Component} from "react";
import Header from "../Header";
import WelcomeFooter from "../../Welcome/WelcomeFooter";
import {NavLink} from "react-router-dom";
import ReadMoreReact from 'read-more-react';
import {firebase} from "../../firebase/firebase";

class Tags extends Component {
    state = {
        tipTags: [],
    };

    componentDidMount() {
        this.getTagTips()
    }

    getTagTips = () => {
        firebase
            .firestore()
            .collection("tips")
            .get()
            .then((doc) => {
                const array = [];

                doc.forEach((doc) => {
                    const data = doc.data();

                    const index = this.props.match.params.id.toString();

                    if (data.tags.indexOf(index) !== -1) {
                        array.push(data);

                        this.setState({
                            tipTags: array,
                        })
                    }
                });
            });
    };

    handleTagChange = () => {
        const index = this.props.match.params.id.toString();
        const { history } = this.props;
        history.push(`/tags/${index}`);
        this.getTagTips();
    };

    render() {
        const style = {
            textDecoration: "none",
            color: "#000",
        };
        const { tipTags } = this.state;
        const index = this.props.match.params.id.toString();

        return (
            <>
                { tipTags.length > 0 &&
                <>
                    <Header/>
                    <section className='tags'>
                        <div className='tags__name'>
                            <h2><i className="fas fa-tags"></i>{index}</h2>
                            <NavLink to={'/home'}>
                                <button className='buttons__big'><i className="fas fa-long-arrow-alt-left"></i>go back</button>
                            </NavLink>
                        </div>
                    </section>

                    {tipTags.map((tip, index) => {
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

                                        {tip.tags.map((tag, index) => {
                                            return (
                                                <>
                                                    <NavLink to={`/tags/${tag}`} key={index} style={style} onClick={this.handleTagChange}>
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
                }
            </>
        );
    }
}

export default Tags;