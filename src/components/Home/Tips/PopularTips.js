import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {NavLink} from "react-router-dom";
import {firebase} from "../../firebase/firebase";

class PopularTips extends Component {
    state = {
        popular: [],
    };

    componentDidMount() {
        this.getPopularTips();
    }

    getPopularTips = () => {
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
                        return b.likes - a.likes;
                    });

                    this.setState({
                        popular: array.slice(0, 3),
                    });
                });
            });
    };

    render() {
        const {popular} = this.state;
        const style = {
            textDecoration: "none"
        };
        return (
            <>
                <div className='tips__newest__popular'>
                    <h2>Popular Tips</h2>
                    <Carousel showThumbs={false} infiniteLoop showStatus={false} transitionTime={1000} centerMode>

                        {popular.map( (tip, index) => {
                            return (
                                <NavLink to={`/tips/${tip.id}`} style={style} key={index}>
                                    <div id={tip.id} className='animation2'>
                                        <h3>{tip.title}</h3>
                                        <img alt="tip4" src={tip.photovideo} />
                                    </div>
                                </NavLink>
                            )
                        })}
                    </Carousel>
                </div>
            </>
        )
    }
}

export default PopularTips;