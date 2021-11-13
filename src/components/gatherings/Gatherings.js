import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import GatheringItem from './GatheringItem';
import { getGatherings, deleteGathering } from '../../actions/gathering';

const Gatherings = ({
    auth,
    getGatherings,
    gathering: { gatherings, hatherings, loading },
    meeter,
    match,
    historyView,
}) => {
    useEffect(() => {
        getGatherings(meeter.active.client);
    }, []);
    const [presentView, setPresentView] = useState(true);

    const handleViewClick = () => {
        setPresentView(!presentView);
    }
    
    return auth.loading || loading ? (
        <Spinner />
    ) : (
        <Fragment>
            {presentView === true ? (
                <>
                <h2>Current Meetings</h2>
                <Link key='future' to='/EditGathering/0'>
                    <div key='one' className='waves-effect waves-light btn'>
                        <i key='two' className='material-icons left green'>
                            add_circle_outline
                        </i>
                        <span key='three'className='meeterNavTextHighlight'>
                            {'  '}NEW
                        </span>
                    </div>
                </Link>
                </>
            ) : ( <h2>Past Meetings</h2>)}
            {presentView === true ? (
                <div onClick={()=>handleViewClick()}>View past meetings</div>
            ):(<div onClick={()=>handleViewClick()}>View upcoming meetings</div>)}
            {presentView === true ? (
                gatherings.map((gathering) => (
                    <GatheringItem key={gathering.meetingId} gathering={gathering} presentView={presentView}/>
                ))
            ) : (
                hatherings.map((hathering) => (
                    <GatheringItem key={hathering.meetingId} gathering={hathering} presentView={presentView}/>
                ))
            )}
        </Fragment>
    );
};

Gatherings.defaultProps = {
    historyView: false,
};
Gatherings.propTypes = {
    auth: PropTypes.object.isRequired,
    meeter: PropTypes.object.isRequired,
    getGatherings: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired,
    // hathering: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    gathering: state.gathering,
    hathering: state.hathering,
    meeter: state.meeter,
    auth: state.auth,
});
export default connect(mapStateToProps, { getGatherings })(Gatherings);
