import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGathering, getGathering } from '../../actions/gathering';
import ServantSelect from './ServantSelect';
import Groups from './Groups';
const initialState = {
    _id: '',
    meetingId: '',
    meetingDate: '',
    facilitator: 'Dano Colombo',
    meetingType: '',
    supportRole: '',
    worship: '',
    title: '',
    meal: '',
    mealCoordinator: 'TBD',
    cafeCoordinator: 'TBD',
    mealCount: 0,
    attendance: 0,
    donations: 0,
    newcomers: 0,
    nursery: 0,
    children: 0,
    youth: 0,
    notes: ''
};

const EditGathering = ({
    gathering: { gathering, servants, loading },
    createGathering,
    getGathering,
    match,
    history
}) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!gathering) getGathering(match.params.id);
        if (!loading) {
            const gatheringData = { ...initialState };
            for (const key in gathering) {
                if (key in gatheringData) gatheringData[key] = gathering[key];
            }
            setFormData(gatheringData);
        }

        if (_id) setFormData({ ...formData, meetingId: _id });
    }, [loading, getGathering, gathering]);

    const {
        _id,
        meetingDate,
        meetingType,
        facilitator,
        supportRole,
        title,
        worship,
        meal,
        mealCoordinator,
        mealCount,
        cafeCoordinator,
        attendance,
        donations,
        newcomers,
        nursery,
        children,
        youth,
        notes
    } = formData;

    const onChange = e => {
        if (e.target == 'phone') {
            console.log('phonephonephonephone');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onServantChange = servantSelected => {
        //we are assuming Facilitator
        setFormData({ ...formData, [facilitator]: servantSelected });
        console.log('back from servantSelect. value: ' + servantSelected);
    };
    const onSubmit = e => {
        e.preventDefault();
        if (formData['meetingType'] == 'Testimony')
            delete formData['supportRole'];
        createGathering(formData, history, true);
    };
    const servantList = servants.map(servant => ({
        label: servant.name,
        value: servant.name
    }));
    const handleServantListChange = facilitator => {
        setFormData({ ...formData, [facilitator]: facilitator });
        console.log(`Option selected:`, { facilitator });
    };

    return (
        // function inside(){
        //     console.log('inside');
        // }
        <Fragment>
            <h1 className='large text-primary'>Your Meeting</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Have at it...
                <br />
            </p>

            <small>* = required field</small>
            <form className='form' onSubmit={onSubmit}>
                <div>
                    <h4>Meeting Date **</h4>
                    <input
                        className='mDate'
                        type='date'
                        name='meetingDate'
                        value={meetingDate.slice(0, 10)}
                        onChange={e => onChange(e)}
                    />
                </div>
                <h4>Facilitator</h4>
                <select
                    value={facilitator}
                    name='facilitator'
                    onChange={onChange}
                >
                    {servants.map(s => (
                        <option key={s.name} value={s.name}>
                            {s.name}
                        </option>
                    ))}
                </select>
                <div className='form-group'>
                    <h4>Meeting Type **</h4>
                    <select
                        key='2'
                        name='meetingType'
                        value={meetingType}
                        onChange={e => onChange(e)}
                    >
                        <option value='0'>** Select the type of meeting</option>
                        <option value='Lesson'>Lesson</option>
                        <option value='Testimony'>Testimony</option>
                        <option value='Special'>Special</option>
                        <option value='Teaching'>Teaching</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        What kind of meeting is this?
                    </small>
                </div>
                <div className='form-group'>
                    {displayTitle()}
                    <input
                        type='text'
                        placeholder={diplayTitleHint()}
                        name='title'
                        value={title ? title : ' '}
                        onChange={onChange}
                    />
                    <small className='form-text'>{diplayTitleSubtitle()}</small>
                </div>
                {meetingType === 'Lesson' && (
                    <Fragment>
                        <select
                            value={supportRole}
                            name='supportRole'
                            onChange={onChange}
                        >
                            {servants.map(s => (
                                <option key={s.name} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        <small className='form-text'>
                            Who is teaching the lesson?
                        </small>
                    </Fragment>
                )}
                <div className='form-group'>
                    <h4>Worship</h4>
                    <input
                        type='text'
                        placeholder='Worship provided by...'
                        name='worship'
                        value={worship}
                        onChange={onChange}
                    />
                    <small className='form-text'>Worship supplied by...</small>
                </div>
                <div className='form-group'>
                    <h4>Attendance</h4>
                    <input
                        type='number'
                        id='attendance'
                        name='attendance'
                        value={attendance}
                        min='0'
                        max='200'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Number of people attending general meeting?
                    </small>
                </div>
                <h4>Newcomers</h4>
                <input
                    type='number'
                    id='newcomers'
                    name='newcomers'
                    value={newcomers}
                    min='0'
                    max='200'
                    onChange={e => onChange(e)}
                />
                <small className='form-text'>Number of newcomers?</small>
                <div className='form-group'>
                    <h4>Donations</h4>
                    <input
                        type='number'
                        id='donations'
                        name='donations'
                        value={donations}
                        min='0.00'
                        step='0.01'
                        max='500'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Amount of donations received?
                    </small>
                </div>
                <div className='form-group'>
                    <h4>Meal</h4>
                    <input
                        type='text'
                        placeholder='Dinner plans...'
                        name='meal'
                        value={meal}
                        onChange={onChange}
                    />
                    <small className='form-text'>Dinner provided</small>
                </div>
                <h4>Meal Coordinator</h4>
                <select
                    value={mealCoordinator ? mealCoordinator : 'pick someone'}
                    name='mealCoordinator'
                    onChange={onChange}
                >
                    {servants.map(s => (
                        <option key={s.name} value={s.name}>
                            {s.name}
                        </option>
                    ))}
                </select>
                <br />
                <h4>Individuals Fed</h4>
                <input
                    type='number'
                    id='mealCount'
                    name='mealCount'
                    value={mealCount}
                    min='0'
                    max='200'
                    onChange={e => onChange(e)}
                />
                <small className='form-text'>Number of people served?</small>
                <h4>Cafe Coordinator</h4>
                <select
                    value={cafeCoordinator ? cafeCoordinator : 'pick someone'}
                    name='cafeCoordinator'
                    onChange={onChange}
                >
                    {servants.map(s => (
                        <option key={s.name} value={s.name}>
                            {s.name}
                        </option>
                    ))}
                </select>
                <small className='form-text'>Cafe coordinator</small>
                <br />
                <h4>Nursery Count</h4>
                <input
                    type='number'
                    id='nursery'
                    name='nursery'
                    value={nursery}
                    min='0'
                    max='200'
                    onChange={e => onChange(e)}
                />
                <small className='form-text'>Number of kids in nursery?</small>
                <br />
                <h4>Children Count</h4>
                <input
                    type='number'
                    id='children'
                    name='children'
                    value={children}
                    min='0'
                    max='200'
                    onChange={e => onChange(e)}
                />
                <small className='form-text'>
                    Number of kids in childcare?
                </small>
                <br />
                <h4>Youth Count</h4>
                <input
                    type='number'
                    id='youth'
                    name='youth'
                    value={youth}
                    min='0'
                    max='200'
                    onChange={e => onChange(e)}
                />
                <small className='form-text'>Number of kids in youth?</small>
                <div className='form-group'>
                    <textarea
                        placeholder='Description and notes for meeting'
                        name='notes'
                        value={notes}
                        onChange={e => onChange(e)}
                    ></textarea>
                    <small className='form-text'>Things to remember</small>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/gatherings'>
                    Go Back
                </Link>
                <div>NOW</div>
                {console.log('in between')}
                {/*console.table(gathering.group)*/}
                {/* <Groups group={gathering.group} /> */}
                <div>THEN</div>
            </form>
        </Fragment>
    );
    function displayTitle() {
        switch (meetingType) {
            case 'Lesson':
                return <h4>Lesson</h4>;
                break;
            case 'Testimony':
                return <h4>Who's Testimony?</h4>;
                break;
            default:
                return <h4>Description</h4>;
        }
    }
    function diplayTitleHint() {
        switch (meetingType) {
            case 'Lesson':
                return 'What is the lesson?';
                break;
            case 'Testimony':
                return "Who's testimony?";
                break;
            default:
                return <h4>Description</h4>;
        }
    }
    function diplayTitleSubtitle() {
        switch (meetingType) {
            case 'Lesson':
                return 'Which lesson is being given?';
                break;
            case 'Testimony':
                return "Who's testimony is being shared?";
                break;
            default:
                return 'Please provide a description of the event';
        }
    }
    function checkForTeacher() {}
    function displayTeacher() {
        if (meetingType === 'Lesson') {
            return [
                <h4>Teacher</h4>,
                <input
                    type='text'
                    placeholder='teacher...'
                    name='title'
                    value={supportRole}
                    onChange={onChange}
                />,
                <small className='form-text'>Who taught the lesson?</small>
            ];
        }
        return null;
    }
    function displayFacilitator() {
        {
            console.log(servants.length);
            var peeps = '';
            servants.forEach(peep => {
                peeps = peeps + peep;
            });
            const sample =
                "<option value='Junior Developer'>Junior Developer</option>";
            console.log(peeps);
            return [
                <div className='form-group'>
                    ,
                    <select name='status' value='{status}' onChange={onChange}>
                        ,<option>* Select Professional Status</option>,{sample},
                    </select>
                    ,
                    <small className='form-text'>
                        , 'Give us an idea of where you are at in your career',
                    </small>
                    ,
                </div>
            ];
        }
    }
};

EditGathering.propTypes = {
    createGathering: PropTypes.func.isRequired,
    getGathering: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    gathering: state.gathering,
    servants: state.servants
});

export default connect(mapStateToProps, { createGathering, getGathering })(
    withRouter(EditGathering)
);
