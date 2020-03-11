import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPerson, getPerson } from '../../actions/person';

const initialState = {
    name: '',
    email: '',
    phone: '',
    service: [],
    active: true,
    shirtSize: '',
    birthday: '',
    training: [],
    system: false,
    notes: ''
};

const EditPeep = ({
    person: { person, loading },
    createPerson,
    getPerson,
    match,
    history,
    pNum
}) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!person) getPerson(match.params.id);
        if (!loading) {
            const personData = { ...initialState };
            for (const key in person) {
                if (key in personData) personData[key] = person[key];
            }
            setFormData(personData);
        }
    }, [loading, getPerson, person]);

    const {
        name,
        email,
        phone,
        service,
        active,
        shirtSize,
        birthday,
        training,
        system,
        notes
    } = formData;

    const onChange = e => {
        if (e.target.name == 'phone') {
            const was = e.target.value;
            const is = '';
            switch (was.size) {
                case 1:
                    is = '(' + was;
                    break;
                case 4:
                    is = was + ') ';
                    break;
                default:
                    break;
            }
            console.log('------)');
            console.log('was:' + was);
            console.log('is:' + is);
            // console.log(e.target.value);
            //e.target.value = is;
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        createPerson(formData, history, true);
    };
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // used for the phone validation and formatting
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // const normalizeInput = (value, previousValue) => {
    //     if (!value) return value;
    //     const currentValue = value.replace(/[^\d]/g, '');
    //     const cvLength = currentValue.length;

    //     if (!previousValue || value.length > previousValue.length) {
    //         if (cvLength < 4) return currentValue;
    //         if (cvLength < 7)
    //             return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    //         return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
    //             3,
    //             6
    //         )}-${currentValue.slice(6, 10)}`;
    //     }
    // };

    // const validateInput = value => {
    //     let error = '';

    //     if (!value) error = 'Required!';
    //     else if (value.length !== 14)
    //         error = 'Invalid phone format. ex: (555) 555-5555';

    //     return error;
    // };
    // const handleChange = event => {
    //     pNum = event.target.value;
    // };

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    return (
        // function inside(){
        //     console.log('inside');
        // }

        <Fragment>
            <h1 className='large text-primary'>People</h1>
            <p className='lead'>
                <i className='fas fa-user' />
                Your valuable resource...
                <br />
            </p>

            <small>* = required field</small>
            <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                    Name
                    <input
                        type='text'
                        placeholder="Person's Name"
                        name='name'
                        value={name}
                        onChange={onChange}
                    />
                    <small className='form-text'>Name of the person</small>
                </div>
                <div className='form-group'>
                    Email
                    <input
                        type='email'
                        // placeholder='good@everything....'
                        name='email'
                        value={email ? email : ' '}
                        onChange={onChange}
                    />
                    <small className='form-text'>Contact email</small>
                </div>
                <div className='form-group'>
                    Phone
                    <input
                        type='text'
                        placeholder='(123) 867-5309'
                        name='phone'
                        value={phone ? phone : ' '}
                        onChange={onChange}
                    />
                    <small className='form-text'>Contact phone number</small>
                </div>
                {/* <div>
                    <input
                        className='input'
                        type='text'
                        name='pNum'
                        placeholder='(xxx) xxx-xxxx'
                        value={pNum}
                        onChange={handleChange}
                    />
                </div> */}
                <div className='form-group'>
                    <input
                        type='checkbox'
                        id='active'
                        name='active'
                        checked={!active ? false : true} //might not have value, if so default to true
                        onChange={e => onChange(e)}
                    />
                    <span>&nbsp;&nbsp;ACTIVE</span>
                    <small className='form-text'>
                        Is the person still an active participant? (Shows up in
                        dropdown lists)
                    </small>
                </div>
                <div className='form-group'>
                    <h4>T-shirt size</h4>
                    <select
                        key='2'
                        name='shirtSize'
                        value={shirtSize}
                        onChange={e => onChange(e)}
                    >
                        <option value='0'>** Select the shirt size **</option>
                        <option value='S'>S</option>
                        <option value='M'>M</option>
                        <option value='L'>L</option>
                        <option value='XL'>XL</option>
                        <option value='2X'>2X</option>
                        <option value='3X'>3X</option>
                    </select>
                    <small className='form-text'>Person's shirt size</small>
                </div>
                <div className='form-group'>
                    <h4>Service Areas</h4>
                    <input
                        type='text'
                        placeholder='Teacher, Meal, Facilitator'
                        name='service'
                        value={service ? service : ' '}
                        onChange={onChange}
                    />
                    <small className='form-text'>Dinner provided</small>
                </div>
                <div className='form-group'>
                    Birthday
                    <input
                        className='person-form-birthday'
                        type='text'
                        placeholder='Sep 10'
                        name='birthday'
                        value={birthday ? birthday : ' '}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        Month and day for birthday
                    </small>
                </div>
                <div className='form-group'>
                    <textarea
                        placeholder='Description and notes relating to this person'
                        name='notes'
                        value={notes}
                        onChange={e => onChange(e)}
                    ></textarea>
                    <small className='form-text'>Things to keep in mind</small>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

EditPeep.propTypes = {
    createPerson: PropTypes.func.isRequired,
    getPerson: PropTypes.func.isRequired,
    person: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    person: state.person
});

export default connect(mapStateToProps, { createPerson, getPerson })(
    withRouter(EditPeep)
);
