import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPerson } from '../../actions/person';

const PersonForm = ({ createPerson, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const { name, email, phone } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        createPerson(formData, history);
    };
    // useEffect(() => {
    //   getCurrentProfile();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [getCurrentProfile]);

    // return loading && profile === null ? (
    //   <Redirect to="/dashboard" />
    // ) : (
    return (
        <Fragment>
            <h1 className='large text-primary'>Person Definition</h1>
            <p className='lead'>
                <i className='far fa-calendar-alt' />
                {'  '}Provide details of the person below
            </p>
            <small>** = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Name of Person'
                        name='name'
                    />
                    <small className='form-text' name='headline-hint'>
                        Person's full name
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Phone Number'
                        name='phone'
                    />
                    <small className='form-text'>Person's phone number</small>
                </div>
                <div className='form-group'>
                    <input type='email' placeholder='Email' name='email' />
                    <small className='form-text'>Person's email address</small>
                </div>

                <input type='submit' className='btn btn-primary my-1' />
                <a className='btn btn-light my-1' href='dashboard.html'>
                    Go Back
                </a>
            </form>
        </Fragment>
    );
};

PersonForm.propTypes = {
    createPerson: PropTypes.func.isRequired
    // getCurrentProfile: PropTypes.func.isRequired
    // profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    // profile: state.profile
});
export default connect(mapStateToProps, { createPerson })(
    withRouter(PersonForm)
);
