import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import tips from './../../Database/tips'

class PopularTips extends Component {
    state = {
        popular: [],
    };

    handleClick = (e) => {
        //console.log("click", e.target.index)
        console.log(e.target.id)
    };

    componentDidMount() {
        for (let i = 0; i < tips.tips.length; i++) {
            const singleTip = tips.tips;

            singleTip.sort( (a, b) => {
                return b.likes - a.likes;
            });
            const popularTip = [ singleTip[0], singleTip[1], singleTip[2] ];

            this.setState({
                popular: popularTip,
            })
        }
    }

    render() {
        const {popular} = this.state;
        return (
            <>
                <div className='tips__newest__popular'>
                    <h2>Popular Tips</h2>
                    <Carousel showThumbs={false} infiniteLoop showStatus={false} transitionTime={1000} centerMode>

                        {popular.map( (tip, index) => {
                            return (
                                <div key={index} id={tip.id} onClick={this.handleClick}>
                                    <h3>{tip.title}</h3>
                                    <img alt="tip4" src={tip.photovideo} />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </>
        )
    }
}

export default PopularTips;