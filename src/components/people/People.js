import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PersonItem from './PersonItem';
import { getPeople } from '../../actions/person';

const People = ({ getPeople, person: { people, loading } }) => {
    useEffect(() => {
        getPeople();
    }, [getPeople]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>People</h1>
            <p className='lead'>
                <i className='fas fa-user'></i>These are your peeps
            </p>
            <div>
                <Link to='/EditPerson/0'>NEW</Link>
            </div>
            <div className='posts'>
                {people.map(person => (
                    <PersonItem key={person._id} person={person} />
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
