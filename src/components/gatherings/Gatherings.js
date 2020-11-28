import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Spinner from '../layout/Spinner';
import GatheringItem from './GatheringItem';
import { getGatherings } from '../../actions/gathering';

const Gatherings = ({
    auth,
    getGatherings,
    gathering: { gatherings, hatherings, loading },
    meeter,
    match,
    historyView,
}) => {
    useEffect(() => {
        //we need to make sure that the system token is loaded and we don't have a cutter.
        // also need the activeClient set.
        // if (
        //     !auth.token ||
        //     auth.isAuthenticated !== true ||
        //     !auth.user.acitveClient
        // ) {
        //     return <Redirect to='/login' />;
        // }
        console.log(
            'GATHERINGS::useEffect, activeClient: ' + meeter.activeClient
        );
        getGatherings(meeter.active.client);
    }, []);
    return auth.loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='far fa-calendar-alt'></i> Meetings
                </h2>

                {offerView()}
            </div>

            <div className='posts'>{throwList()}</div>
        </Fragment>
    );
    function throwList() {
        if (match.params.options === 'historyView') {
            return [
                hatherings.map((hathering) => (
                    <GatheringItem key={hathering.id} gathering={hathering} />
                )),
            ];
        } else {
            return [
                gatherings.map((gathering) => (
                    <GatheringItem key={gathering.id} gathering={gathering} />
                )),
            ];
        }
    }
    function offerView() {
        if (match.params.options === 'historyView') {
            return [
                <Link to='/gatherings'>
                    <span className='meeterNavTextHighlight'>
                        Active Meetings
                    </span>
                </Link>,
                <p className='lead'>Your historical list of meetings...</p>,
            ];
        } else {
            return [
                <Link to='/gatherings/historyView'>HISTORY</Link>,
                <p className='lead'>List of upcoming meetings...</p>,
                <Link to='/EditGathering/0'>
                    <a class='waves-effect waves-light btn'>
                        <i class='material-icons left green'>
                            add_circle_outline
                        </i>
                        <span className='meeterNavTextHighlight'>
                            {'  '}NEW
                        </span>
                    </a>
                </Link>,
            ];
        }
        return null;
    }
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
