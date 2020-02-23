import React, { useEffect, useState, Fragment, Profiler } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGathering, getGathering } from '../../actions/gathering';

const GatheringForm = ({
    match,
    getGathering,
    gathering: { gathering, lodaing },
    createGathering,
    history
}) => {
    const [gatheringId, setGatheringId] = useState({ id: null });
    const [formData, setFormData] = useState({
        meetingDate: '',
        facilitator: '',
        meetingType: '',
        supportString: 'First value',
        title: '',
        teacher: '',
        teacherVisible: true,
        meal: '',
        mealCoordinator: '',
        mealCount: 0,
        attendance: 0,
        donations: 0,
        notes: ''
    });
    const {
        meetingDate,
        facilitator,
        meetingType,
        supportString,
        title,
        teacher,
        teacherVisible,
        meal,
        mealCoordinator,
        mealCount,
        attendance,
        donations,
        notes
    } = formData;
    const onChange = e => {
        var assistString;
        if (e.target.name === 'meetingType') {
            var title = '';
            var teachShow;
            if (e.target.value === 'Testimony') {
                assistString = 'Who is giving their testimony?';
                //document.getElementById('teacher').style.visibility = 'hidden';
                teachShow = false;
            }
            if (e.target.value === 'Lesson') {
                assistString = 'What is the lesson on?';
                //document.getElementById('teacher').style.visibility = 'visible';
                teachShow = true;
            }
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                supportString: assistString
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log('submitting');
        createGathering(formData, history);
    };
    useEffect(() => {
        if (match.params.id) {
            //we have an id, which means that we need to fetch and load
            getGathering(match.params.id);
            const mtgData = { ...formData };
            for (const key in gathering) {
                if (key in mtgData) mtgData[key] = gathering[key];
            }
            setFormData(mtgData);
            // if ({{gathering._id}}) {
            //     console.log('we got data');
            // }
            // var dbValues = [];
            // (gathering.title) dbValues().add(title: {gathering.title});
        }

        setFormData({
            ...formData
        });
    }, [getGathering]);

    // useEffect(() => {
    //   getCurrentProfile();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [getCurrentProfile]);

    // return loading && profile === null ? (
    //   <Redirect to="/dashboard" />
    // ) : (
    return (
        <Fragment>
            <h1 className='large text-primary'>Meeting Definition</h1>
            <p className='lead'>
                <i className='far fa-calendar-alt' />
                {'  '}Provide details of the meeting below
            </p>
            <small>** = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <h4>Meeting Date **</h4>
                    <input
                        type='date'
                        name='meetingDate'
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <select name='facilitator' onChange={e => onChange(e)}>
                        <option value='0'>
                            * Select who is facilitating the meeting
                        </option>
                        <option value='5e462c736b22679b2dbae981'>
                            Dano Colombo
                        </option>
                        <option value='5e462caa6b22679b2dbae982'>
                            Joni Colombo
                        </option>
                        <option value='5e462cc66b22679b2dbae983'>
                            Bubba Gordy
                        </option>
                        <option value='5e462cd46b22679b2dbae984'>
                            Bryan Donaldson
                        </option>
                        <option value='0'>TBD</option>
                    </select>
                    <small className='form-text'>
                        Person accountable & responsible for the meeting.
                    </small>
                </div>
                <div className='form-group'>
                    <select name='meetingType' onChange={e => onChange(e)}>
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
                    <input
                        type='text'
                        placeholder={supportString}
                        name='title'
                        onChange={e => onChange(e)}
                    />
                    <small
                        className='form-text'
                        name='headline-hint'
                        visible={{ meetingType: 'Testmony' ? false : true }}
                    >
                        {supportString}
                    </small>
                </div>
                <div className='form-group'>
                    <select name='teacher' onChange={e => onChange(e)} visible>
                        <option value='0'>
                            * Select who is teaching the lesson
                        </option>
                        <option value='5e462c736b22679b2dbae981'>
                            Dano Colombo
                        </option>
                        <option value='5e462caa6b22679b2dbae982'>
                            Joni Colombo
                        </option>
                        <option value='5e462cc66b22679b2dbae983'>
                            Bubba Gordy
                        </option>
                        <option value='5e462cd46b22679b2dbae984'>
                            Bryan Donaldson
                        </option>
                        <option value='0'>TBD</option>
                    </select>
                    <small className='form-text'>
                        Person teaching the lesson
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder={meal}
                        name='meal'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Whats for dinner?</small>
                </div>
                <div className='form-group'>
                    <select name='mealCoordinator' onChange={e => onChange(e)}>
                        <option value='0'>
                            * Select who coordinating the meal
                        </option>
                        <option value='5e462c736b22679b2dbae981'>
                            Dano Colombo
                        </option>
                        <option value='5e462caa6b22679b2dbae982'>
                            Joni Colombo
                        </option>
                        <option value='5e462cc66b22679b2dbae983'>
                            Bubba Gordy
                        </option>
                        <option value='5e462cd46b22679b2dbae984'>
                            Bryan Donaldson
                        </option>
                        <option value='0'>TBD</option>
                    </select>
                    <small className='form-text'>
                        Person accountable & responsible for meal
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='number'
                        id='mealCount'
                        name='mealCount'
                        min='0'
                        max='100'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>How many ate dinner?</small>
                </div>
                <div className='form-group'>
                    <input
                        type='number'
                        id='attendance'
                        name='attendance'
                        min='0'
                        max='200'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        How many attended large group?
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='$$'
                        name='donations'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>Donations received</small>
                </div>
                <div className='form-group'>
                    <textarea
                        placeholder='Description and notes for meeting'
                        name='notes'
                        onChange={e => onChange(e)}
                    ></textarea>
                    <small className='form-text'>Things to remember</small>
                </div>

                <input type='submit' className='btn btn-primary my-1' />
                <a className='btn btn-light my-1' href='dashboard.html'>
                    Go Back
                </a>
            </form>
        </Fragment>
    );
};

GatheringForm.propTypes = {
    createGathering: PropTypes.func.isRequired,
    getGathering: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired
    // getCurrentProfile: PropTypes.func.isRequired
    // profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    gathering: state.gathering
});
export default connect(mapStateToProps, { createGathering, getGathering })(
    withRouter(GatheringForm)
);
