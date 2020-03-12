import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import GatheringItem from './GatheringItem';
import { getGatherings } from '../../actions/gathering';

const Gatherings = ({
    getGatherings,
    gathering: { gatherings, hatherings, loading },
    match,
    historyView
}) => {
    useEffect(() => {
        // console.log('SKylar: ' + match.params.options);

        getGatherings();
    }, [getGatherings]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='far fa-calendar-alt'></i> Meetings
                </h2>

                {offerView()}
            </div>

            <div className='posts'>
                {throwList()}
                {/* {gatherings.map(gathering => (
                    <GatheringItem key={gathering._id} gathering={gathering} />
                ))} */}
            </div>
        </Fragment>
    );
    function throwList() {
        if (match.params.options === 'historyView') {
            return [
                hatherings.map(hathering => (
                    <GatheringItem key={hathering._id} gathering={hathering} />
                ))
            ];
        } else {
            return [
                gatherings.map(gathering => (
                    <GatheringItem key={gathering._id} gathering={gathering} />
                ))
            ];
        }
    }
    function offerView() {
        if (match.params.options === 'historyView') {
            return [
                <Link to='/gatherings'>Active Gatherings</Link>,
                <p className='lead'>Your historical list of meetings...</p>
            ];
        } else {
            return [
                <Link to='/gatherings/historyView'>HISTORY</Link>,
                <p className='lead'>Below is the upcoming meetings...</p>,
                <Link to='/EditGathering/0'>NEW</Link>
            ];
        }
        return null;
    }
};

Gatherings.defaultProps = {
    historyView: false
};
Gatherings.propTypes = {
    getGatherings: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired,
    hathering: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    gathering: state.gathering,
    hathering: state.hathering
});
export default connect(mapStateToProps, { getGatherings })(Gatherings);
