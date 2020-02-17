import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-dom';
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
      <h2 className="large text-primary">
        <i className="far fa-calendar-alt"></i> Gatherings
      </h2>
      <p className="lead">These are your gatherings...</p>
      <a href="/gatheringForm">
        <i class="far fa-calendar-plus"></i>
        {'  '}Add a meeting
      </a>

      <div className="posts">
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
