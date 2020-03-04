import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import GatheringItem from './GatheringItem';
import { getGatherings } from '../../actions/gathering';

const Gatherings = ({ getGatherings, gathering: { gatherings, loading } }) => {
    useEffect(() => {
        getGatherings();
    }, [getGatherings]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
            <h2 className='large text-primary'>
                <i className='far fa-calendar-alt'></i> Gatherings
            </h2>
            <div className='gatheringDirection'>HISTORY</div>
        </div>
           <p className='lead'>Below is the upcoming meetings...</p>
            <Link to='/EditGathering/0'>NEW</Link>
            
            <div className='posts'>
                {gatherings.map(gathering => (
                    <GatheringItem key={gathering._id} gathering={gathering} />
                ))}
            </div>
        </Fragment>
    );
};

Gatherings.propTypes = {
    getGatherings: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    gathering: state.gathering
});
export default connect(mapStateToProps, { getGatherings })(Gatherings);
