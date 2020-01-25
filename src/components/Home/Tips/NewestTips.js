import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import tips from './../../Database/tips'
import {NavLink} from "react-router-dom";

class NewestTips extends Component {
    state = {
        newestTips: [],
    };

    componentDidMount() {
        for (let i = 0; i < tips.tips.length; i++) {
            const singleTip = tips.tips;

            singleTip.sort( (a, b) => {
                return b.id - a.id;
            });
            const newTip = [ singleTip[0], singleTip[1], singleTip[2] ];

            this.setState({
                newestTips: newTip,
            })
        }
    }

    render() {
        const style = {
            textDecoration: "none",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        };
        const { newestTips } = this.state;
        return (
            <>
                <div className='tips__newest__popular'>
                    <h2>Newest Tips</h2>
                    <Carousel showThumbs={false} infiniteLoop showStatus={false} transitionTime={1000} centerMode>
                        {newestTips.map((tip, index) => {
                                return (
                                    <NavLink to={`/tips/${tip.id}`} style={style} key={index}>
                                        <div id={tip.id} className='animation2'>
                                            <h3>{tip.title}</h3>
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