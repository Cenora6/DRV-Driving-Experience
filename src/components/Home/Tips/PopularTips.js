import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import tip4 from './../../../assets/article4.jpg'
import tip5 from './../../../assets/article5.jpg'
import tip6 from './../../../assets/article6.jpg'

class PopularTips extends Component {

    render() {

        return (
            <>
                <div className='tips__newest__popular'>
                    <h2>Popular Tips</h2>
                    <Carousel showThumbs={false} infiniteLoop showStatus={false} transitionTime={1000} centerMode>
                        <div>
                            <h3>Safety tips for truck drivers [20]</h3>
                            <img alt="tip4" src={tip4} />
                        </div>
                        <div>
                            <h3>Aggressive driving and road rage [04]</h3>
                            <img alt="tip5" src={tip5} />
                        </div>
                        <div>
                            <h3>Winter driving preparedness [11]</h3>
                            <img alt="tip6" src={tip6} />
                        </div>
                    </Carousel>
                </div>
            </>
        )
    }
}

export default PopularTips;