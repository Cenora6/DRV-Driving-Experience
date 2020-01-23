import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WeeklyTips from "./WeeklyTips";
import NewestTips from "./NewestTips";
import PopularTips from "./PopularTips";

class TipsMain extends Component {

    render() {

        return (
            <>
                <section className='tips'>
                    <WeeklyTips/>
                    <NewestTips/>
                    <PopularTips/>
                </section>
            </>
        )
    }
}

export default TipsMain;