import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import tip1 from './../../../assets/article1.jpg'
import tip2 from './../../../assets/article2.jpg'
import tip3 from './../../../assets/article3.jpg'

class NewestTips extends Component {

    render() {

        return (
            <>
                <div className='tips__newest__popular'>
                    <h2>Newest Tips</h2>
                    <Carousel showThumbs={false} infiniteLoop showStatus={false} transitionTime={1000} centerMode>
                        <div>
                            <h3>Car and Driver [23]</h3>
                            <img alt="tip1" src={tip1} />
                        </div>
                        <div>
                            <h3>Mobile phones and driving safety [24]</h3>
                            <img alt="tip2" src={tip2} />
                        </div>
                        <div>
                            <h3>Speed limits [25]</h3>
                            <img alt="tip3" src={tip3} />
                        </div>
                    </Carousel>
                </div>
            </>
        )
    }
}

export default NewestTips;