import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {NavLink} from "react-router-dom";
import {firebase} from "../../firebase/firebase";

class NewestTips extends Component {
    state = {
        tips: [],
    };

    componentDidMount() {
        this.getNewestTips();
    }

    getNewestTips = () => {
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
                        tips: array.slice(0, 3),
                    });
                });
            });
    };

    render() {

        const style = {
            textDecoration: "none",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        };
        const { tips } = this.state;
        return (
            <>
                <div className='tips__newest__popular'>
                    <h2>Newest Tips</h2>
                    <Carousel showThumbs={false} infiniteLoop showStatus={false} transitionTime={1000} centerMode>
                        {tips.map((tip, index) => {
                                return (
                                    <NavLink to={`/tips/${tip.id}`} style={style} key={index}>
                                        <div id={tip.id} className='animation2'>
                                            <h3 className='header__h3'>{tip.title}</h3>
                                            <img alt="tip1" src={tip.photovideo} id={tip.id}/>
                                        </div>
                                    </NavLink>
                                )
                            }
                        )}
                    </Carousel>
                </div>
            </>
        )
    }
}

export default NewestTips;