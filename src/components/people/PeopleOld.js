import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PeopleItem from './PeopleItem';
// import PostForm from './PostForm';
import { getPeople } from '../../actions/people';

const People = ({ getPeople, person: { people, loading } }) => {
  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      {/* <PostForm /> */}
      <div className="posts">
        {people.map(person => (
          <PeopleItem key={person._id} post={person} />
        ))}
      </div>
    </Fragment>
  );
};

People.propTypes = {
  getPeople: PropTypes.func.isRequired,
  person: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  person: state.person
});

export default connect(mapStateToProps, { getPeople })(People);
