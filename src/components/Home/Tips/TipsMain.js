import React, {Component} from 'react';
import tipPhoto from './../../../assets/weekly-tip.jpg'

class TipsMain extends Component {

    render() {

        return (
            <>
                <section className='tips'>
                    <div className='tips__week'>
                        <div className='tips__week__title'>
                            <h2>Weekly Tip</h2>
                            <span>Tuesday, 5 May 2019</span>
                        </div>
                        <div className='tips__week__description'>
                            <h3>Safe engine braking [54]</h3>
                            <img src={tipPhoto} alt='weekly-tip'/>
                            <p>
                                Ut sollicitudin velit sit amet porta facilisis. Pellentesque sit amet dictum neque,
                                sed consequat justo. Fusce volutpat libero eu tellus accumsan, nec iaculis lorem placerat.
                                Maecenas lectus ex, eleifend ut congue in, porttitor quis lectus. Morbi vehicula volutpat
                                elementum. Mauris dictum finibus orci vel dignissim. Cras condimentum justo vel ipsum
                                mollis molestie. Nunc in iaculis ipsum. Aliquam placerat imperdiet risus ac ullamcorper
                                . Pellentesque ac vestibulum nulla. Praesent dolor ipsum, ultricies consequat rhoncus
                                quis, feugiat a lorem. Vivamus vehicula ipsum quis erat bibendum varius. Mauris
                                ullamcorper, tortor a sollicitudin condimentum, augue tortor tempor sapien, non
                                euismod turpis libero vitae magna. Pellentesque pharetra augue ut mi porttitor,
                                quis interdum nunc rutrum.
                            </p>
                            <div className='tips__week__description__button'>
                                <button className='buttons__small'>Zalicz trening</button>
                            </div>

                        </div>
                    </div>
                    <div className='tips__newest'>

                    </div>
                </section>
            </>
        )
    }
}

export default TipsMain;