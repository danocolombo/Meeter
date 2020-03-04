import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPerson, getCurrentPerson } from '../../actions/person';

const PersonForm = ({ createPerson, getCurrentPerson, history }) => {
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
    useEffect(() => {
        //useEffect is called when page first loads to get on Edit
        getCurrentPerson();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentPerson]);

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
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text' name='name-hint'>
                        Person's full name
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Phone Number'
                        name='phone'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Person's phone number</small>
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={e => onChange(e)}
                    />
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
    createPerson: PropTypes.func.isRequired,
    getCurrentPerson: PropTypes.func.isRequired
    // profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    // profile: state.profile
});
export default connect(mapStateToProps, { createPerson, getCurrentPerson })(
    withRouter(PersonForm)
);
